import csv

data = {
    "What are you looking to replace?": "Wet Gypsum Underlayment",
    "Replace System": "OSB + Wet Gypsum with MAXTERRA MgO Fire- And Water-Resistant Underlayment",
    "Project Size (sq ft)": 10000,
    "Building Type": "Commercial Office",
    "Total Project Savings ($)": 16650,
    "Cost Savings per SF ($)": 1.67,
    "Current System Cost ($)": 35750,
    "Current System Cost per SF ($/sq ft)": 3.58,
    "MAXTERRA System Cost ($)": 19100,
    "MAXTERRA Cost per SF ($/sq ft)": 1.91,
    "First Name": "YourFirstName",
    "Last Name": "YourLastName",
    "Email": "you@example.com",
}

with open('output.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Field", "Value"])
    for k, v in data.items():
        writer.writerow([k, v])

print("CSV file 'output.csv' created successfully.")
