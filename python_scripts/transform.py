import json

# Function to transform a single JSON object
def transform_json(input_json, index):
    try:
        date = input_json["dates"]["start"]["localDate"]
        time = input_json["dates"]["start"].get("localTime", "TBD")
        venue = input_json["_embedded"]["venues"][0]
        coordinates = {
            "longitude": venue["location"]["longitude"],
            "latitude": venue["location"]["latitude"]
        }
        genres = [input_json["classifications"][0]["segment"]["name"],
                  input_json["classifications"][0]["genre"]["name"],
                  input_json["classifications"][0]["subGenre"]["name"]]
    except KeyError as e: # if some field is missing, just skip the concert.
        print(f"Skipping concert {input_json['name']}: {str(e)}")
        return None
    
    output_json = {
        "name": input_json["name"],
        "url": input_json["url"],
        "image": input_json["images"][0],
        "date": date,
        "time": time,
        "location": {
            "venue": venue["name"],
            "coordinates": coordinates
        },
        "genre": genres,
        "cid": index - 1 #this is bc of our quick-fix sorting thing
    }
    return {index: output_json}

# Process all page files and write the output to output.json
def process_pages(output_file):
    transformed_events = {}

    # Loop through page files from page1.json to page4.json
    for page_number in range(1, 5):
        page_file = f'page{page_number}.json'

        with open(page_file, 'r') as infile:
            page_data = json.load(infile)

        for index, event in enumerate(page_data["_embedded"]["events"], start=len(transformed_events) + 1):
            transformed_event = transform_json(event, index)
            if transformed_event is not None:
                transformed_events.update(transformed_event)

    # Sort the events by date and time
    sorted_events = sorted(transformed_events.items(), key=lambda x: (x[1]["date"], x[1]["time"]))

    sorted_events_dict = {}
    for index, event_dict in sorted_events:
        try:
            sorted_events_dict[str(index)] = event_dict
        except (KeyError, ValueError, TypeError):
            print(f"Skipping concert {event_dict['name']} due to unexpected data.")
            continue

    sorted_events_dict = {"Concerts": sorted_events_dict}

    with open(output_file, 'w') as outfile:
        json.dump(sorted_events_dict, outfile, indent=4)

# Output file path
output_file_path = 'output.json'  # Replace with your output file path

# Process all page files and write the output to output.json
process_pages(output_file_path)

