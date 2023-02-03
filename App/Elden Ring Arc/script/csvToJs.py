import os;
import sys;
import csv;
import json;

# 1. Convert a row into python dictionary
# 2. add category into category set
def row2map(row, category=None, isWeapon=True):
    

    category = row["category"] if category == None else category;
    categories.add(category);
    map = {};
    map["name"] = row["name"];
    map["category"] =  category;
    map["requires"] = {
        "str" : 0,
        "dex" : 0,
        "int" : 0,
        "fai" : 0,
        "arc" : 0,
    }

    if isWeapon == True:
        temp = row['requiredAttributes'].replace("\'", "\"");
    else:
        temp = row['requires'].replace("\'", "\"");
    temp = json.loads(temp);

    for json_obj in temp:
        map['requires'][json_obj['name'].lower()] = json_obj['amount'];
    return map;

#Change Working Directort
os.chdir( os.path.dirname( os.path.abspath(__file__) ) );

#Declaration of variables
data = "";
jsons = "";
categories = set();

with open('weapons.csv', newline='\n') as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        rc = json.dumps(row2map(row), ensure_ascii=False).encode('utf8').decode();
        jsons += "      \"{}\" : {},\n".format(row['name'], rc);

with open('shields.csv', newline='\n') as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        if row['name'] not in ["Eclipse Crest Heater Shield", "Eclipse Crest Greatshield"]:
            rc = json.dumps(row2map(row), ensure_ascii=False).encode('utf8').decode();
            jsons += "      \"{}\" : {},\n".format(row['name'], rc);

with open('sorceries.csv', newline='\n') as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        rc = json.dumps(row2map(row, category="Sorcery", isWeapon=False), ensure_ascii=False).encode('utf8').decode();
        jsons += "      \"{}\" : {},\n".format(row['name'], rc);


with open('incantations.csv', newline='\n') as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        # As the csv file miss these two row
        if row['name'] != "Glintstone Breath" and row['name'] != "Vyke's Dragonbolt":
            rc = json.dumps(row2map(row, category="Incantation", isWeapon=False), ensure_ascii=False).encode('utf8').decode();
            jsons += "      \"{}\" : {},\n".format(row['name'], rc);


#Write data
data = "function item_map(){\n";
data += "    let map = {\n";
data += "{}\n".format(jsons);
data += "    };\n";
data += "    return map;\n";
data += "}\n";
data += "function cate_list() { return " +   "{}".format(sorted(categories)) + " }";


#Write file
with open("item_map.js", 'w', encoding='utf-8') as js_file:
    js_file.write(data);