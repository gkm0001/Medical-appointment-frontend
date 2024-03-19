import React, { useContext, useEffect } from "react";
import { PersonalInfoDetails } from "../Context/PersonalInfo/PersonalInfoDetails";

const Algo = () => {
    const { userdata, setuserdata } = useContext(PersonalInfoDetails);

    useEffect(() => {
        if (userdata.score) {
            let priority_score = 0;

            const agesScore = () => {
                priority_score += userdata.ages >= 18 && userdata.ages <= 50 ? 10 : 8;
            };

            const diseaseScore = () => {
                priority_score += userdata.Diseases === "Heath_related" || userdata.Diseases === "Cancer" ? 10 : 8;
            };

            const allergiesScore = () => {
                priority_score += userdata.Allergies === "YES" ? 10 : 0;
            };

            const currentMedicalConditionsScore = () => {
                switch (userdata.Current_medical_Conditions) {
                    case "Mild":
                        priority_score += 5;
                        break;
                    case "Moderate":
                        priority_score += 8;
                        break;
                    default:
                        priority_score += 20;
                }
            };

            const previousSurgeriesScore = () => {
                priority_score += userdata.Previous_Surgeries !== "No" ? 10 : 5;
            };

            const symptomsScore = () => {
                priority_score += userdata.symptoms !== "No" ? 3 : 10;
            };

            // Function calls
            previousSurgeriesScore();
            currentMedicalConditionsScore();
            allergiesScore();
            agesScore();
            diseaseScore();
            symptomsScore();
            console.log(priority_score);

            setuserdata({ ...userdata, score: priority_score });
        }
    }, [setuserdata, userdata]);

    return null; // assuming this component doesn't render anything
};

export default Algo;
