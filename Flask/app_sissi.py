from flask import Flask, send_from_directory, request, jsonify
import numpy as np
import timeit
import matplotlib.pyplot as plt
import threading
import os
from numpy.linalg import inv as inv

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/static/js/<path:path>')
def serve_js(path):
    return send_from_directory('static/static/js', path)

@app.route('/static/css/<path:path>')
def serve_css(path):
    return send_from_directory('static/static/css', path)

@app.route('/static/media/<path:path>')
def serve_media(path):
    return send_from_directory('static/static/media', path)

def run_flask_app():
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))







def run_calcul_server():
    # Code pour exécuter votre serveur de calcul
    @app.route("/test", methods=['POST','GET'])
    def members():
        
        ### ALGORITHME
        def algo(lambda_n,theta, a, d, M):
            #constantes
            c = 2.99e8
            Z_0 = 376.730
            k_b = 1.380649e-23
            e = 1.602e-19
            h = 1.054571817e-34
            # gamma = (1.054232e-22 ) / h
            GAMMA = 0.658e-3 * 1.60218e-19 / h


            #### entrées
            Temp  = 300  # Température en Kelvin
            mu_c = 0.39 * 1.60218e-19  # Potentiel chimique
            omega = (2*(np.pi)*c)/lambda_n  # Fréquence de l'onde incidente

            # M = 10  # Nombre de termes dans la série de Fourier
            epsilon_milieu_in = 1  # Constante diélectrique réelle du milieu intérieur
            epsilon_milieu_out = 1  # Constante diélectrique réelle du milieu extérieur

            K = (2*np.pi) / d
            k_0 = omega / c
            # k_0 = 2*np.pi / lambda_n

            ## k in et out
            k_i = k_0 * np.sqrt(epsilon_milieu_in)
            k_o = k_0 * np.sqrt(epsilon_milieu_out)

            ## alpha
            alpha_0 = k_i * np.sin(theta)

            alpha_n = [alpha_0 + n*K for n in range(-M, M+1)]


            ## gamma
            gamma_i = np.array([complex(k_i**2 - alpha**2)**0.5 for alpha in alpha_n])
            gamma_o = np.array([complex(k_o**2 - alpha**2)**0.5 for alpha in alpha_n])

            gamma_i_prime = gamma_i / epsilon_milieu_in
            gamma_o_prime = gamma_o / epsilon_milieu_out

            ## sigma
            sigma_intra = (2j * e**2 * k_b * Temp) / (np.pi * h**2 * (omega + GAMMA*1j)) * np.log(2 * np.cosh(mu_c / (2 * k_b * Temp)))
            sigma_inter = ((e**2) / (4 * h)) * (0.5 + (1 / np.pi) * np.arctan((h * (omega + GAMMA*1j) - 2 * mu_c) / (2 * k_b * Temp)) - (1j / (2 * np.pi)) * np.log(((h * (omega + GAMMA*1j) + 2 * mu_c)**2) / ((h * (omega + GAMMA*1j) - 2 * mu_c)**2 + (2 * k_b * Temp)**2)))
            sigma_g = sigma_intra + sigma_inter
            sigma_0 = a*sigma_g


            N = 2*M + 1
            LAMBDA = np.eye(N) +1j*np.eye(N)
            for ligne in range(N) :
                for colonne in range(N) :
                    if ligne == colonne :
                        LAMBDA[ligne][colonne] = sigma_0
                    else :
                        LAMBDA[ligne][colonne] = (1j*complex(sigma_g))/(2*(colonne-ligne)*np.pi)*(np.exp(-1j*(colonne-ligne)*K*a)-1)


            gamma_o_diag = np.eye(len(gamma_o_prime)) +1j*np.eye(len(gamma_o_prime))
            for ligne in range(len(gamma_i_prime)) :
                for colonne in range(len(gamma_i_prime)) :
                    if ligne == colonne :
                        gamma_o_diag[ligne][colonne] = gamma_o[ligne]

            gamma_o_prime_diag = np.eye(len(gamma_o_prime)) +1j*np.eye(len(gamma_o_prime))
            for ligne in range(len(gamma_i_prime)) :
                for colonne in range(len(gamma_i_prime)) :
                    if ligne == colonne :
                        gamma_o_prime_diag[ligne][colonne] = gamma_o_prime[ligne]

            gamma_i_diag = np.eye(len(gamma_i_prime)) +1j*np.eye(len(gamma_i_prime))
            for ligne in range(len(gamma_i_prime)) :
                for colonne in range(len(gamma_i_prime)) :
                    if ligne == colonne :
                        gamma_i_diag[ligne][colonne] = gamma_i[ligne]

            I = [0]*M + [1] + [0]*M


            R = (inv(inv(gamma_o_diag).dot(gamma_i_diag) +(Z_0/k_0)*LAMBDA.dot(gamma_o_prime_diag).dot(inv(gamma_o_diag)).dot(gamma_i_diag) +np.eye(N)).dot(inv(gamma_o_diag).dot(gamma_i_diag) +(Z_0/k_0)*LAMBDA.dot(gamma_o_prime_diag).dot(inv(gamma_o_diag)).dot(gamma_i_diag) -np.eye(N))).dot(I)
            T = inv(gamma_o_diag).dot(gamma_i_diag).dot(I-R)

            E_r = np.real(gamma_i_prime/gamma_i_prime[M]) * np.abs(R)**2
            E_t = np.real(gamma_o_prime/gamma_i_prime[M]) * np.abs(T)**2
            Abs1 = 1 - (np.sum(E_r) + np.sum(E_t))


            Abs2 = 1 - np.sum(E_r + E_t)


            return Abs1



        json_data = request.get_json()  # Récupère le JSON envoyé
        # Effectuez le traitement souhaité sur le JSON ici
        print(json_data)

        #data = json.loads(json_data)

        Lambda = json_data["electromagnetic_wave"]["lambda"]
        polarization = json_data["electromagnetic_wave"]["polarization"]

        type_geometry = json_data["geometry"]["type"]
        theta = json_data["geometry"]["theta"]
        a = json_data["geometry"]["a"]
        d = json_data["geometry"]["d"]

        M = json_data["numerical_parameter"]["M"]
        mapping = json_data["numerical_parameter"]["mapping"]

        medium_1 = json_data["numerical_parameter"]["M"]
        medium_2 = json_data["numerical_parameter"]["M"]
        material = json_data["numerical_parameter"]["M"]


        #Lambda correspond au lambda du fichier reçu dans ["electromagnetic_wave"]["lambda"]
        #Si lambda est une liste et que lambda_max est de l'ordre de 1000x lambda_min ou plus; alors on veut créer une liste de valeurs exploitables pour une échelle logarithmique pour l'axe des abscisses.
        if isinstance(Lambda, list):
            if Lambda[0]/Lambda[1] <= 1e-3:
                liste_lambdas = [10**(np.log10(Lambda[0]) + i*(np.log10(Lambda[1]) - np.log10(Lambda[0]))/(Lambda[2]-1)) for i in range(Lambda[2])]
            else:
                liste_lambdas = [Lambda[0] + i*(Lambda[1]-Lambda[0])/(Lambda[2]-1) for i in range(Lambda[2])]
        else:
            liste_lambdas = [Lambda] #On crée une liste avec un seul lambda pcq après on va parcourir tous les paramètres potentiellement variables


        if isinstance(theta, list):
            if theta[0]/theta[1] <= 1e-3:
                liste_thetas = [10**(np.log10(theta[0]) + i*(np.log10(theta[1]) - np.log10(theta[0]))/(theta[2]-1)) for i in range(theta[2])]
            else:
                liste_thetas = [theta[0] + i*(theta[1]-theta[0])/(theta[2]-1) for i in range(theta[2])]
        else:
            liste_thetas = [theta] #On crée une liste avec un seul lambda pcq après on va parcourir tous les paramètres potentiellement variables


        if isinstance(a, list):
            if a[0]/a[1] <= 1e-3:
                liste_a = [10**(np.log10(a[0]) + i*(np.log10(a[1]) - np.log10(a[0]))/(a[2]-1)) for i in range(a[2])]
            else:
                liste_a = [a[0] + i*(a[1]-a[0])/(a[2]-1) for i in range(a[2])]
        else:
            liste_a = [a] #On crée une liste avec un seul lambda pcq après on va parcourir tous les paramètres potentiellement variables



        if isinstance(d, list):
            if d[0]/d[1] <= 1e-3:
                liste_d = [10**(np.log10(d[0]) + i*(np.log10(d[1]) - np.log10(d[0]))/(d[2]-1)) for i in range(d[2])]
            else:
                liste_d = [d[0] + i*(d[1]-d[0])/(d[2]-1) for i in range(d[2])]
        else:
            liste_d = [d] #On crée une liste avec un seul lambda pcq après on va parcourir tous les paramètres potentiellement variables



        if "Spectre d'absorption" in json_data["numerical_parameter"]["result_list"]:
            big_liste_sisi = []
            for a in liste_a :
                for d in liste_d :
                    for Lambda in liste_lambdas :
                        for theta in liste_thetas :
                    #pour une cartographie faudrait boucler sur z puis sur x aussi
                            big_liste_sisi += [algo(Lambda, theta, a, d, M)] #s'assurer que c'est bien une liste simple et pas une liste de listes qui ressort

            
        
        result = {"lambda": liste_lambdas,
                "absorption": big_liste_sisi,
                "a" : liste_a,
                "d" : liste_d,
                "theta" : liste_thetas}
        
        print(result)
        return jsonify(result)
        

    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 50)))

if __name__ == '__main__':
    # Créez les threads pour les deux serveurs
    flask_thread = threading.Thread(target=run_flask_app)
    calcul_thread = threading.Thread(target=run_calcul_server)

    # Lancez les threads
    flask_thread.start()
    calcul_thread.start()

    # Attendez que les threads
    flask_thread.join()
    calcul_thread.join()