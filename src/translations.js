const translations = {
    en: {
        translation: {
            "Switch": "Russian",
            "PortalName": "ML Portal",
            "Intro": "Introduction",
            "Regression": "Regression",
            "Classification": "Classification",
            "RigdeRegression": "Rigde Regression",
            "classification": {
                "where": "где ",
                "and": " and ",
                "thus": "Тhus",
                "1": "Classification is the task of supervised learning with <strong>discrete</strong> target variable.",
                "5": "Recap the idea of gradient descent:",
                "6": "where  - network parameters at the step of gradient descent and  - the step (learning rate)",
                "7": "This is a vector notation of the equation in which each element of the vector is modified",
                "8": ", that is if ",
                "then": ", then ",
                "10": "Also, recall that we minimizing the mean square loss function",
                "11": " - value of the sample for a pair",
                "12": " - calculated value of the network for input",
                "13": "Further, according to the differentiation chain rule",
                "14": " - the sum (dot product of weights весов и bias) of the neuron",
                "15": " at layer ",
                "16": " before the sum value is passed to the activation function (in our case - to sigmoid).",
                "solve": "Solve",
                "shuffle": "Shuffle",
                "weights": "Weights"
            },
            "regression": {
                "1": "Regtesssoin is the task of supervised learning where with continious target variable"
            }
        }
    },
    ru: {
        translation: {
            "Switch": "English",
            "PortalName": "ML Portal (ru)",
            "Intro": "Введение",
            "Regression": "Регрессия",
            "Classification": "Классификация",
            "RigdeRegression": "Гребневая регрессия",
            "classification": {
                "where": "где ",
                "and": " и ",
                "thus": "Таким образом",
                "1": "Классификация является задачей машинного обучения с <strong>дискретным</strong> набором выходных значений (меток).",
                "5": "Напомним основную идею метода градиентного спуска:",
                "6": "где  - параметры сети на  итерации градиентного спуска и  - шаг (learning rate)",
                "7": "Это векторная запись уравнения, в котором производится изменение каждого элемента вектора",
                "8": ", т.е. если ",
                "then": ", то ",
                "10": "Напомним также, что мы минимизируем среднеквадратичную функцию потерь",
                "11": " - значение элемента выборки для пары",
                "12": " - вычисленное значение сети для входа",
                "13": "Далее, по правилу дифференцирования сложной функции",
                "14": " - сумматор (скалярное произведение весов и смещение) нейрона",
                "15": " в слое ",
                "16": " до того, как значение сумматора будет передано в функцию активации (в нашем случае, в сигмоид).",
                "solve": "Решить",
                "shuffle": "Новые данные",
                "weights": "Веса"
            },
            "regression": {
                "1": "Regtesssoin is the task of supervised learning where with continious target variable"
            },
        }
    }
}

export default translations;