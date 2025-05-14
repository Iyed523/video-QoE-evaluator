import mysql.connector
import pandas as pd
import matplotlib.pyplot as plt

# Fonction pour se connecter à la base de données et récupérer les données
def fetch_data():
    conn = mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="3Wa12s&oi@fal",
        database="cava",
    )
    cursor = conn.cursor()
    query = "SELECT * FROM donnee"
    cursor.execute(query)
    df = pd.DataFrame(cursor.fetchall(), columns=[col[0] for col in cursor.description])
    cursor.close()
    conn.close()
    return df

# Fonction pour calculer et afficher les confusions entre résolutions réelles et perçues
def analyze_confusions(df):
    df[['QO1_response1', 'QO1_response2']] = df['QO1'].str.extract(r'\(([^,]+), ([^)]+)\)')
    pairs_real_vs_perceived = list(zip(df['resolution1'], df['QO1_response1'])) + \
                              list(zip(df['resolution2'], df['QO1_response2']))
    pairs_df = pd.DataFrame(pairs_real_vs_perceived, columns=['real_resolution', 'perceived_resolution'])
    pairs_df = pairs_df[pairs_df['real_resolution'] != pairs_df['perceived_resolution']]
    confusion_counts = pairs_df.groupby(['real_resolution', 'perceived_resolution']).size().reset_index(name='count')
    sorted_confusions = confusion_counts.sort_values(by='count', ascending=False)
    print(sorted_confusions)
    plot_confusion(sorted_confusions)

# Fonction pour afficher un graphique des confusions
def plot_confusion(sorted_confusions):
    sorted_confusions['pair'] = sorted_confusions['real_resolution'] + ' → ' + sorted_confusions['perceived_resolution']
    plt.figure(figsize=(10, 8))
    plt.barh(sorted_confusions['pair'], sorted_confusions['count'], color='skyblue')
    plt.xlabel('Number of Confusions')
    plt.ylabel('Resolution Pair')
    plt.title('Most Confused Resolution Pairs')
    plt.gca().invert_yaxis()
    plt.grid(axis='x', linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.show()

# Fonction pour calculer le taux de précision des utilisateurs
def calculate_accuracy(df):
    df[['QO1_response1', 'QO1_response2']] = df['QO1'].str.extract(r'\(([^,]+), ([^)]+)\)')
    correct_first_video = df['resolution1'] == df['QO1_response1']
    correct_second_video = df['resolution2'] == df['QO1_response2']
    total_correct = correct_first_video.sum() + correct_second_video.sum()
    total_comparisons = len(df['resolution1']) + len(df['resolution2'])
    accuracy = (total_correct / total_comparisons) * 100
    print(f"Taux de précision des utilisateurs : {accuracy:.2f}%")

# Fonction pour analyser les critères les plus importants
def analyze_criteria(df):
    criteria_counts = df['QO5'].value_counts()
    print(criteria_counts)
    criteria_counts.plot(kind='bar', color='skyblue', title='Most Important Criteria for Users')
    plt.xlabel('Criterion')
    plt.ylabel('Number of responses')
    plt.show()

# Fonction pour analyser la satisfaction par résolution
def analyze_satisfaction(df):
    df[['imageQuality1', 'imageQuality2']] = df['QO2'].str.extract(r'\(([^,]+), ([^)]+)\)')
    satisfaction_quality1 = df.groupby(['resolution1', 'imageQuality1']).size().unstack(fill_value=0)
    satisfaction_quality2 = df.groupby(['resolution2', 'imageQuality2']).size().unstack(fill_value=0)
    print("Satisfaction par Résolution - Première Vidéo")
    print(satisfaction_quality1)
    print("Satisfaction par Résolution - Deuxième Vidéo")
    print(satisfaction_quality2)
    plot_satisfaction(satisfaction_quality1, 'Première Vidéo')
    plot_satisfaction(satisfaction_quality2, 'Deuxième Vidéo')

# Fonction pour afficher un graphique de satisfaction
def plot_satisfaction(satisfaction_data, title):
    satisfaction_data.plot(kind='bar', stacked=True, figsize=(10, 6), colormap='viridis')
    plt.title(f'Satisfaction by Resolution')
    plt.xlabel('Actual Resolution')
    plt.ylabel('Number of responses')
    plt.legend(title='Perceived Quality')
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.show()

# Fonction principale
def main():
    df = fetch_data()
    print("Les premières lignes des données :")
    print(df.head())
    analyze_confusions(df)
    calculate_accuracy(df)
    analyze_criteria(df)
    analyze_satisfaction(df)

# Appeler le main
if __name__ == "__main__":
    main()
