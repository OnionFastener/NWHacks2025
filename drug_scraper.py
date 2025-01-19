import requests  # Library to send HTTP requests
from bs4 import BeautifulSoup  # Library to parse HTML and XML documents
from bs4 import NavigableString
import pandas as pd  # Library to manipulate and analyze data
import re

# Common Names of the 100 Most Common OTC Medicines
c_names = [
    "Advil", "Tylenol", "Aspirin", "Benadryl", "Claritin", "Zyrtec", "Tums", "Pepto-Bismol", 
    "NyQuil", "DayQuil", "Imodium", "Alka-Seltzer", "Excedrin", "Mucinex", "Sudafed", 
    "Theraflu", "Robitussin", "Zantac", "Prilosec", "Rolaids", "Miralax", "Laxative", 
    "Vicks VapoRub", "Maalox", "Motrin", "Cough Drops", "Listerine", "Tylenol PM", "Airborne",
    "Bayer", "Zofran", "Flonase", "Metamucil", "Neosporin", "Afrin", "Hydrocortisone", 
    "Lotrimin", "Monistat", "Bactine", "MiraLAX", "Teldrin", "Alli", "Imodium AD", "BioFreeze",
    "Selsun Blue", "Gold Bond", "Dove Soap", "Tylenol Extra Strength", "Midol", "Zyrtec-D", 
    "Pepto", "Allegra", "Voltaren", "Sodium Chloride", "Miralax", "Aquaphor", "Cold-Eeze", 
    "Dulcolax", "Claritin-D", "Sundown Naturals", "Neutrogena", "Lotrimin AF", "Cetaphil", 
    "Zinc Oxide", "Excedrin Migraine", "Nizoral", "Orajel", "Benedryl Itch Relief", 
    "Sodium Bicarbonate", "Bayer Aspirin", "Benadryl Cream", "Vicks NyQuil", "Epsom Salt", 
    "Halls", "Pepcid AC", "Icy Hot", "Medi-First", "Sinex", "Citrucel", "Aleve", "OxyClean", 
    "Bio-Oil", "Aquafresh", "Colgate", "Tussin", "Imodium A-D", "Hepatitis B Vaccine", "Delsym", 
    "Nyquil Severe", "Robitussin Cough", "Mucinex Fast-Max", "Advair Diskus", "Zyrtec Allergies", 
    "Excedrin Extra Strength", "Mucinex Sinus", "Azo", "Lysol", "Clearasil", "Crest", 
    "Dove Body Wash", "Caladryl", "Mederma", "Aleve PM", "Zicam", "Vicks DayQuil", "ColdCalm", 
    "Monistat 7", "Kleenex", "Cough Suppressant", "Naproxen", "Tannacomp", "Advil Liqui-Gels", 
    "Talcum Powder", "Tiger Balm", "Azo Urinary Pain Relief", "Hydrocodone"
]
common_names = [item.lower() for item in c_names]

# Generic Names of the 100 Most Common OTC Medicines
g_names = [
    "Ibuprofen", "Acetaminophen", "Acetylsalicylic Acid", "Diphenhydramine", "Loratadine", 
    "Cetirizine", "Calcium Carbonate", "Bismuth Subsalicylate", "Acetaminophen, Dextromethorphan", 
    "Pseudoephedrine", "Aspirin, Caffeine, Acetaminophen", "Guaifenesin", "Pseudoephedrine", 
    "Phenylephrine", "Diphenhydramine", "Guaifenesin", "Cimetidine", "Omeprazole", "Calcium Carbonate", 
    "Polyethylene Glycol", "Bisacodyl", "Camphor, Menthol", "Magnesium Hydroxide", "Acetaminophen", 
    "Vitamin C", "Acetaminophen, Diphenhydramine", "Acetylsalicylic Acid", "Ondansetron", "Fluticasone", 
    "Psyllium", "Neomycin, Polymyxin B, Bacitracin", "Oxymetazoline", "Hydrocortisone", "Clotrimazole", 
    "Miconazole", "Benzocaine", "Polyethylene Glycol", "Orlistat", "Loperamide", "Menthol", "Zinc Oxide", 
    "Hydrocortisone", "Ranitidine", "Propylene Glycol", "Ipratropium Bromide", "Docusate Sodium", 
    "Cetirizine", "Benzoic Acid", "Loratadine", "Acetaminophen", "Ibuprofen", "Phenylephrine", "Benzocaine", 
    "Sodium Bicarbonate", "Fluconazole", "Fexofenadine", "Cetirizine", "Diphenhydramine", "Paracetamol", 
    "Guaifenesin", "Pseudoephdrine", "Miconazole", "Benzocaine", "Acetaminophen, Dextromethorphan", 
    "Decongestant", "Hydrocodone", "Cough Suppressant", "Propylene Glycol", "Zinc Oxide", "Camphor", 
    "Dextromethorphan", "Acetaminophen, Pseudoephedrine", "Oxymetazoline", "Hydrocortisone", "Miconazole", 
    "Salicylic Acid", "Hydrocodone", "Acetaminophen", "Benzocaine", "Cyclohexanol", "Oral Rehydration Salts", 
    "Dextromethorphan", "Azelastine", "Benzyl Alcohol", "Oxymetazoline", "Eucalyptus", "Acetaminophen", 
    "Bismuth Subsalicylate", "Ibuprofen", "Acetaminophen", "Menthol", "Saline", "Benzocaine", 
    "Guaifenesin", "Acetaminophen" ,"CAMPHOR (SYNTHETIC)"
]

generic_names = [item.lower() for item in g_names]


# URL to scrape
url = "https://www.drugs.com/otc-a1.html"

# Send a request to fetch the page content
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Initialize a list to store the drug information
drugs_data = []

# Locate the drug entries on the page
drugs_list = soup.find_all('ul', class_='ddc-list-column-2')

# Loop through each drug entry and extract details
for drugs in drugs_list:
    for drug in drugs.find_all('li'):
        common_name = drug.get_text(strip=True)
        
        # Follow the link to the drug's details page
        link = drug.find('a')['href']
        drug_url = f"https://www.drugs.com{link}"
        drug_response = requests.get(drug_url)
        drug_soup = BeautifulSoup(drug_response.text, 'html.parser')
        
        try:
            # Extract drug details from the details page
            generic_name = 'temp'
            
            details = drug_soup.find('p', class_="drug-subtitle").get_text(strip=True)
            
            ingredient = ''
            detail_sections = drug_soup.find('p', class_="drug-subtitle").find_all('b')
            
            for detail in detail_sections:
                ingredients_label = detail.get_text(strip=True)
                if (detail.get_text(strip=True).lower() == "ingredients:"):
                    ingredients_text = detail.next_sibling
                    re_name = re.findall(r'[A-Z\s]+(?=\s*\(|\s*\d)', ingredients_text)
                    re_name = [name.strip() for name in re_name if name.strip()]

                    generic_name = ', '.join(name.strip() for name in re_name)
            
            general_information = drug_soup.find('div', class_='Contents').find_all('div', class_='Section')
            
            # context = ''
            # for section in general_information:
            #     context += ", " + section.get_text(separator=' ', strip=True)
                
            purposes = ''
            for section in general_information:
                if (section.find('b').get_text(strip=True) == 'Purpose'):
                    symptoms = section.find_all('p')
                    for symptom in symptoms:
                        purposes += ", " + symptom.get_text(separator=' ', strip=True)
                        
            
        except AttributeError:
            # Handle missing data gracefully
            if (purposes == ""):
                purposes = "N/A"
           

        # Add the extracted data to the list
        if ((common_name.lower() in common_names) or (generic_name.lower() in generic_names)) and (purposes != "N/A"):
            drugs_data.append({
                'Common Name': common_name,
                'Generic Name': generic_name,
                # 'Details': details,
                'Purposes': purposes,
                # 'Additional Context': context
                'Ingredient': generic_name
            })
            print("added " + common_name)

# Convert the data to a DataFrame
df = pd.DataFrame(drugs_data)

# Save the DataFrame to a CSV file
df.to_csv('drugs_data2.csv', index=False)

print("Data scraping complete. Saved to drugs_data2.csv.")
