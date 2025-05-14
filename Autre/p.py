import yt_dlp
import os

def downloadv(link, folder, id, resol):
    output_folder = folder
    format = f"bestvideo[height<={resol}][ext=mp4]+bestaudio[ext=m4a]/best[height<={resol}][ext=mp4]"

    try:
        ydl_opts = {
            'format': format,  # télécharger la meilleure qualité
            'merge_output_format': 'mp4',
            'outtmpl': os.path.join(output_folder, f'{id}{resol}.%(ext)s')  # nom du fichier de sortie
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([link])
        print(f"Download completed! File saved in {output_folder}")
    except Exception as e:
        print(f"An error occurred: {e}")
        print("Please try another URL.")

if __name__ == '__main__':
    # Exemple d'appel de la fonction (à modifier selon l'utilisation)
    downloadv('https://www.youtube.com/watch?v=example', '/path/to/folder', 'video_id', '1080')
