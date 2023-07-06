"""Ce module contient des fonctions en python
pour déléguer les tâches trop complexes en zsh"""

import csv

def remplit_tableau():
    """Remplit un tableau html à partir des données
    de versions.csv
    Le tableau est publié dans l'ordre inverse des lignes du fichier csv
    (Dans l'ordre chronologique)"""
    with open('versions.csv', newline="") as version_file:
        reader = csv.reader(version_file, delimiter=',')
        rows = [r for r in reader]
    rows.reverse()
    table = ""
    for r in rows:
        version = r[0]
        link = f"""<a href="{version}/index.html">"""
        table += f"""<tr><td>{link}{version}</a></td>
                         <td>{link}{r[1]}</a></td>
                         <td>{link}{r[2]}</a></td>
                     </tr>"""
    return table

def produit_index():
    """Crée le fichier index.html"""
    tableau = remplit_tableau()
    with open("index.html.template") as f:
        template = f.read()

    index = template.replace("{{ }}",tableau)
    with open("index.html",'w') as f:
        f.write(index)



