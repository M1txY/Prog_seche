function calculate() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseFloat(document.getElementById('age').value);
    const duration = parseFloat(document.getElementById('duration').value);

    if (isNaN(weight) || isNaN(height) || isNaN(age) || isNaN(duration)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    const result = calculate_macros(weight, height, age, duration);
    displayResult(result);
}

function calculate_macros(weight, height, age, duration_of_workout) {
    // Conversion de la taille en mètres
    const height_in_meters = height / 100;
    
    // Calcul du métabolisme basal (MB)
    const MB = 13.75 * weight + 500 * height_in_meters - 6.75 * age + 88.362;
    
    // Ajout des calories supplémentaires en fonction de la durée de la musculation
    let workout_calories;
    if (duration_of_workout === 0) {
        workout_calories = 0;
    } else if (duration_of_workout === 1) {
        workout_calories = 250;  // 1 heure de musculation
    } else if (duration_of_workout === 1.5) {
        workout_calories = 350;  // 1 heure 30 de musculation
    } else if (duration_of_workout === 2) {
        workout_calories = 450;  // 2 heures de musculation
    } else {
        throw new Error("Invalid workout duration");
    }
    
    // Calcul des calories totales
    const total_calories = MB + workout_calories;
    
    // Calcul des macronutriments
    const calories_proteines = weight * 1.8 * 4;
    const calories_lipides = weight * 0.8 * 9;
    const calories_glucides = total_calories - calories_proteines - calories_lipides;
    
    // Conversion en grammes
    const grammes_proteines = calories_proteines / 4;
    const grammes_lipides = calories_lipides / 9;
    const grammes_glucides = calories_glucides / 4;
    
    // Pourcentage de chaque macronutriment
    const pourcentage_proteines = (calories_proteines / total_calories) * 100;
    const pourcentage_lipides = (calories_lipides / total_calories) * 100;
    const pourcentage_glucides = (calories_glucides / total_calories) * 100;
    
    return {
        "Total Calories": total_calories.toFixed(2),
        "Proteins (kcal)": calories_proteines.toFixed(2),
        "Lipids (kcal)": calories_lipides.toFixed(2),
        "Carbohydrates (kcal)": calories_glucides.toFixed(2),
        "Proteins (g)": grammes_proteines.toFixed(2),
        "Lipids (g)": grammes_lipides.toFixed(2),
        "Carbohydrates (g)": grammes_glucides.toFixed(2),
        "Protein (%)": pourcentage_proteines.toFixed(2),
        "Lipids (%)": pourcentage_lipides.toFixed(2),
        "Carbohydrates (%)": pourcentage_glucides.toFixed(2)
    };
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous result

    const tableGrams = document.createElement('table');
    const tablePercentage = document.createElement('table');
    const tbodyGrams = document.createElement('tbody');
    const tbodyPercentage = document.createElement('tbody');

    for (const [key, value] of Object.entries(result)) {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');

        cell1.textContent = key;
        cell2.textContent = value;

        row.appendChild(cell1);
        row.appendChild(cell2);

        if (key.includes('(g)')) {
            tbodyGrams.appendChild(row);
        } else if (key.includes('(%')) {
            tbodyPercentage.appendChild(row);
        }
    }

    // Agregar el valor de "Total Calories" a ambas tablas
    const totalCaloriesRow = document.createElement('tr');
    const totalCaloriesCell1 = document.createElement('td');
    const totalCaloriesCell2 = document.createElement('td');

    totalCaloriesCell1.textContent = "Total Calories";
    totalCaloriesCell2.textContent = result["Total Calories"];

    totalCaloriesRow.appendChild(totalCaloriesCell1);
    totalCaloriesRow.appendChild(totalCaloriesCell2);

    tbodyGrams.appendChild(totalCaloriesRow.cloneNode(true));
    tbodyPercentage.appendChild(totalCaloriesRow.cloneNode(true));

    tableGrams.appendChild(tbodyGrams);
    tablePercentage.appendChild(tbodyPercentage);
    resultDiv.appendChild(tableGrams);
    resultDiv.appendChild(document.createElement('br')); // Adding a line break between tables
    resultDiv.appendChild(tablePercentage);
}


// rajouter des option pour modifier les % par protéines, lipides et glucides pour les personnes qui ont des besoins spécifiques