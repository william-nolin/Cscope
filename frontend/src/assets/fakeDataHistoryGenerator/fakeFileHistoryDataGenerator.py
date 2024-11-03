from datetime import datetime, timedelta
import random


# Enum pour les types d'évolution de fichier
class TypeFileCommitEvolution:
    ADD_SOURCE_FILE = "TypeFileCommitEvolution.ADD_SOURCE_FILE"
    SET_SOURCE_FILE = "TypeFileCommitEvolution.SET_SOURCE_FILE"
    DELETE_SOURCE_FILE = "TypeFileCommitEvolution.DELETE_SOURCE_FILE"
    ADD_TEST_FILE = "TypeFileCommitEvolution.ADD_TEST_FILE"
    SET_TEST_FILE = "TypeFileCommitEvolution.SET_TEST_FILE"
    DELETE_TEST_FILE = "TypeFileCommitEvolution.DELETE_TEST_FILE"
    ADD_DOC_FILE = "TypeFileCommitEvolution.ADD_DOC_FILE"
    SET_DOC_FILE = "TypeFileCommitEvolution.SET_DOC_FILE"
    DELETE_DOC_FILE = "TypeFileCommitEvolution.DELETE_DOC_FILE"


# Liste des types d'évolution de fichier par catégorie
type_evolutions = [
    TypeFileCommitEvolution.ADD_SOURCE_FILE,
    TypeFileCommitEvolution.SET_SOURCE_FILE,
    TypeFileCommitEvolution.DELETE_SOURCE_FILE,
    TypeFileCommitEvolution.ADD_TEST_FILE,
    TypeFileCommitEvolution.SET_TEST_FILE,
    TypeFileCommitEvolution.DELETE_TEST_FILE,
    TypeFileCommitEvolution.ADD_DOC_FILE,
    TypeFileCommitEvolution.SET_DOC_FILE,
    TypeFileCommitEvolution.DELETE_DOC_FILE,
]

# Dictionnaire de correspondance entre catégorie et types d'évolution
category_evolutions = {
    "source": [
        TypeFileCommitEvolution.ADD_SOURCE_FILE,
        TypeFileCommitEvolution.SET_SOURCE_FILE,
        TypeFileCommitEvolution.DELETE_SOURCE_FILE,
    ],
    "test": [
        TypeFileCommitEvolution.ADD_TEST_FILE,
        TypeFileCommitEvolution.SET_TEST_FILE,
        TypeFileCommitEvolution.DELETE_TEST_FILE,
    ],
    "documentation": [
        TypeFileCommitEvolution.ADD_DOC_FILE,
        TypeFileCommitEvolution.SET_DOC_FILE,
        TypeFileCommitEvolution.DELETE_DOC_FILE,
    ],
}


# Fonction pour générer un nombre donné de fichiers dans chaque catégorie
def generate_files(num_source, num_test, num_doc):
    files = {
        "source": [f"sourceFile{i}.js" for i in range(1, num_source + 1)],
        "test": [f"testFile{i}.js" for i in range(1, num_test + 1)],
        "documentation": [f"docFile{i}.md" for i in range(1, num_doc + 1)],
    }
    return files


# Fonction pour générer l'évolution d'un fichier avec des étapes réalistes
def generate_file_evolution(file_name, category, file_id):
    evolutions = []
    start_date = datetime(2022, 1, 1)
    num_modifications = random.randint(
        2, 5
    )  # Chaque fichier a entre 2 et 5 étapes d'évolution

    for _ in range(num_modifications):
        # Sélectionner un type d'évolution basé sur la catégorie
        evolution_type = random.choice(category_evolutions[category])
        date = start_date + timedelta(
            days=random.randint(0, 365)
        )  # Date aléatoire dans l'année 2022
        evolutions.append(
            {
                "fileId": file_id,  # Utiliser le même fileId pour chaque évolution du même fichier
                "fileName": file_name,
                "typeEvolution": evolution_type,
                "Date": date.strftime("%Y-%m-%d"),
            }
        )

        # Avance la date pour la prochaine modification
        start_date = date + timedelta(
            days=random.randint(5, 30)
        )  # Espacement entre les modifications

    return evolutions


# Générer la liste complète de FileEvolutionCommit
def generate_file_evolution_commit_data(num_source, num_test, num_doc):
    files = generate_files(num_source, num_test, num_doc)
    data = []
    file_ids = {}  # Dictionnaire pour stocker le fileId de chaque fichier

    for category, file_list in files.items():
        for file_name in file_list:
            # Assigner un fileId unique pour chaque fichier si non déjà assigné
            if file_name not in file_ids:
                file_ids[file_name] = (
                    len(file_ids) + 1
                )  # FileId unique basé sur le compteur du dictionnaire

            # Générer les évolutions pour ce fichier en utilisant le même fileId
            file_evolutions = generate_file_evolution(
                file_name, category, file_ids[file_name]
            )
            data.extend(file_evolutions)

    return data


# Générer 10 fichiers source, 5 fichiers de test, et 3 fichiers de documentation
data = generate_file_evolution_commit_data(num_source=100, num_test=20, num_doc=10)

# Convertir les données au format TypeScript
ts_data = "const data: FileEvolutionCommit[] = [\n"
for entry in data:
    ts_data += f"    {{ fileId: {entry['fileId']}, fileName: \"{entry['fileName']}\", "
    ts_data += f"typeEvolution: {entry['typeEvolution']}, category: \"{entry['category']}\", Date: new Date(\"{entry['Date']}\") }},\n"
ts_data += "];\n\nexport default data;"

# Sauvegarder dans un fichier TypeScript
with open("FileEvolutionCommitData.ts", "w") as file:
    file.write(ts_data)

print("Le fichier 'FileEvolutionCommitData.ts' a été généré avec succès.")
