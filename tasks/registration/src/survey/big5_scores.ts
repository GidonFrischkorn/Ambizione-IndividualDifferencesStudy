export function bfi2_scores(responses: { [key: string]: any }, expInfo: any) {
    // BFI-2
    var bfi2_resp = {};
    if (expInfo.DESIGN.BFI2_type == "extra-short") {
        bfi2_resp = { ...responses["bfi2-matrix-0"], ...responses["bfi2-matrix-1"]};
    } else if (expInfo.DESIGN.BFI2_type == "short") {
        bfi2_resp = { ...responses["bfi2-matrix-0"], ...responses["bfi2-matrix-1"], ...responses["bfi2-matrix-2"] };
    } else if (expInfo.DESIGN.BFI2_type == "full") {
        bfi2_resp = { ...responses["bfi2-matrix-0"], ...responses["bfi2-matrix-1"], ...responses["bfi2-matrix-2"],
                    ...responses["bfi2-matrix-3"], ...responses["bfi2-matrix-4"], ...responses["bfi2-matrix-5"] };
    } else {
        throw new Error("BFI-2 type not supported");
    };
        // Define item labels
        const item_labels: string[] = [
            "BFI-E-1",
            "BFI-V-2",
            "BFI-G-3R",
            "BFI-NE-4R",
            "BFI-O-5R",
            "BFI-E-6",
            "BFI-V-7",
            "BFI-G-8R",
            "BFI-NE-9R",
            "BFI-O-10",
            "BFI-E-11R",
            "BFI-V-12R",
            "BFI-G-13",
            "BFI-NE-14",
            "BFI-O-15",
            "BFI-E-16R",
            "BFI-V-17R",
            "BFI-G-18",
            "BFI-NE-19",
            "BFI-O-20",
            "BFI-E-21",
            "BFI-V-22R",
            "BFI-G-23R",
            "BFI-NE-24R",
            "BFI-O-25R",
            "BFI-E-26R",
            "BFI-V-27",
            "BFI-G-28R",
            "BFI-NE-29R",
            "BFI-O-30R",
            "BFI-E-31R",
            "BFI-V-32",
            "BFI-G-33",
            "BFI-NE-34",
            "BFI-O-35",
            "BFI-E-36R",
            "BFI-V-37R",
            "BFI-G-38",
            "BFI-NE-39",
            "BFI-O-40",
            "BFI-E-41",
            "BFI-V-42R",
            "BFI-G-43",
            "BFI-NE-44R",
            "BFI-O-45R",
            "BFI-E-46",
            "BFI-V-47R",
            "BFI-G-48R",
            "BFI-NE-49R",
            "BFI-O-50R",
            "BFI-E-51R",
            "BFI-V-52",
            "BFI-G-53",
            "BFI-NE-54",
            "BFI-O-55R",
            "BFI-E-56",
            "BFI-V-57",
            "BFI-G-58R",
            "BFI-NE-59",
            "BFI-O-60",
        ];
    
        // Code Items to dimensions & facets
        const item_assignments = {
            // Dimensions
            extraversion: [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56],
            agreeableness: [2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57],
            conscientiousness: [3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58],
            emotional_stability: [4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59],
            openness: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
            // Facets: only calculate for full & short versions
            sociability: [1, 16, 31, 46],
            assertiveness: [6, 21, 36, 51],
            energy_level: [11, 26, 41, 56],
            compassion: [2, 17, 32, 47],
            respectfulness: [7, 22, 37, 52],
            trust: [12, 27, 42, 57],
            organization: [3, 18, 33, 48],
            productiveness: [8, 23, 38, 53],
            responsibility: [13, 28, 43, 58],
            anxiety: [4, 19, 34, 49],
            depression: [9, 24, 39, 54],
            emotional_volatility: [14, 29, 44, 59],
            intellectual_curiosity: [5, 20, 35, 50],
            aesthetic_sensitivity: [10, 25, 40, 55],
            creative_imagination: [15, 30, 45, 60],
        };

    // Scale scores
    // BFI-2: extraversion
    const bfi2_extraversion_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-E"));
    let bfi2_extraversion_sum = 0;

    bfi2_extraversion_all.forEach(([key, value]) => {
        const num_value = Number(value); 
        if (key.endsWith("R")) {
            // Reverse-scored items: subtract from the scale
            bfi2_extraversion_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
        } else {
            // Regular items: add to the scale
            bfi2_extraversion_sum += num_value;
        }
    });

    const bfi2_extraversion_sum_score = bfi2_extraversion_sum;
    const bfi2_extraversion_mean_score = bfi2_extraversion_sum/bfi2_extraversion_all.length;
    
    // BFI-2: agreeableness
    const bfi2_agreeableness_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-V"));
    let bfi2_agreeableness_sum = 0;

    bfi2_agreeableness_all.forEach(([key, value]) => {
        const num_value = Number(value); 
        if (key.endsWith("R")) {
            // Reverse-scored items: subtract from the scale
            bfi2_agreeableness_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
        } else {
            // Regular items: add to the scale
            bfi2_agreeableness_sum += num_value;
        }
    });
    
    const bfi2_agreeableness_sum_score = bfi2_agreeableness_sum;
    const bfi2_agreeableness_mean_score = bfi2_agreeableness_sum/bfi2_agreeableness_all.length;

    // BFI-2: conscientiousness
    const bfi2_conscientiousness_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-G"));
    let bfi2_conscientiousness_sum = 0;

    bfi2_conscientiousness_all.forEach(([key, value]) => {
        const num_value = Number(value); 
        if (key.endsWith("R")) {
            // Reverse-scored items: subtract from the scale
            bfi2_conscientiousness_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
        } else {
            // Regular items: add to the scale
            bfi2_conscientiousness_sum += num_value;
        }
    });
    
    const bfi2_conscientiousness_sum_score = bfi2_conscientiousness_sum;
    const bfi2_conscientiousness_mean_score = bfi2_conscientiousness_sum/bfi2_conscientiousness_all.length;

    // BFI-2: emotional stability
    const bfi2_emotional_stability_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-NE"));
    let bfi2_emotional_stability_sum = 0;

    bfi2_emotional_stability_all.forEach(([key, value]) => {
        const num_value = Number(value); 
        if (key.endsWith("R")) {
            // Reverse-scored items: subtract from the scale
            bfi2_emotional_stability_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
        } else {
            // Regular items: add to the scale
            bfi2_emotional_stability_sum += num_value;
        }
    });

    const bfi2_emotional_stability_sum_score = bfi2_emotional_stability_sum;
    const bfi2_emotional_stability_mean_score = bfi2_emotional_stability_sum/bfi2_emotional_stability_all.length;

    // BFI-2: openness
    const bfi2_openness_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-O"));
    let bfi2_openness_sum = 0;

    bfi2_openness_all.forEach(([key, value]) => {
        const num_value = Number(value); 
        if (key.endsWith("R")) {
            // Reverse-scored items: subtract from the scale
            bfi2_openness_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
        } else {
            // Regular items: add to the scale
            bfi2_openness_sum += num_value;
        }
    });

    const bfi2_openness_sum_score = bfi2_openness_sum;
    const bfi2_openness_mean_score = bfi2_openness_sum/bfi2_openness_all.length;

    if (expInfo.DESIGN.BFI2_type !== "extra-short") {
        // sociability
        const bfi2_sociability_all = item_assignments.sociability.map(index => item_labels[index - 1]);
        let bfi2_sociability_sum = 0;

        bfi2_sociability_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_sociability_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_sociability_sum += num_value;
            }
        });
        
        const bfi2_sociability_sum_score = bfi2_sociability_sum;
        const bfi2_sociability_mean_score = bfi2_sociability_sum/bfi2_sociability_all.length;

        // assertiveness
        const bfi2_assertiveness_all = item_assignments.assertiveness.map(index => item_labels[index - 1]);
        let bfi2_assertiveness_sum = 0;

        bfi2_assertiveness_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_assertiveness_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_assertiveness_sum += num_value;
            }
        });
        
        const bfi2_assertiveness_sum_score = bfi2_assertiveness_sum;
        const bfi2_assertiveness_mean_score = bfi2_assertiveness_sum/bfi2_assertiveness_all.length;

        // energy_level
        const bfi2_energy_level_all = item_assignments.energy_level.map(index => item_labels[index - 1]);
        let bfi2_energy_level_sum = 0;

        bfi2_energy_level_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_energy_level_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_energy_level_sum += num_value;
            }
        });

        const bfi2_energy_level_sum_score = bfi2_energy_level_sum;
        const bfi2_energy_level_mean_score = bfi2_energy_level_sum/bfi2_energy_level_all.length;
        
        // compassion
        const bfi2_compassion_all = item_assignments.compassion.map(index => item_labels[index - 1]);
        let bfi2_compassion_sum = 0;

        bfi2_compassion_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_compassion_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_compassion_sum += num_value;
            }
        });
        
        const bfi2_compassion_sum_score = bfi2_compassion_sum;
        const bfi2_compassion_mean_score = bfi2_compassion_sum/bfi2_compassion_all.length;

        // respectfulness
        const bfi2_respectfulness_all = item_assignments.respectfulness.map(index => item_labels[index - 1]);
        let bfi2_respectfulness_sum = 0;

        bfi2_respectfulness_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_respectfulness_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_respectfulness_sum += num_value;
            }
        });
        
        const bfi2_respectfulness_sum_score = bfi2_respectfulness_sum;
        const bfi2_respectfulness_mean_score = bfi2_respectfulness_sum/bfi2_respectfulness_all.length;

        // trust
        const bfi2_trust_all = item_assignments.trust.map(index => item_labels[index - 1]);
        let bfi2_trust_sum = 0;

        bfi2_trust_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_trust_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_trust_sum += num_value;
            }
        });
        
        const bfi2_trust_sum_score = bfi2_trust_sum;
        const bfi2_trust_mean_score = bfi2_trust_sum/bfi2_trust_all.length;

        // organization
        const bfi2_organization_all = item_assignments.organization.map(index => item_labels[index - 1]);
        let bfi2_organization_sum = 0;

        bfi2_organization_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_organization_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_organization_sum += num_value;
            }
        });
        
        const bfi2_organization_sum_score = bfi2_organization_sum;
        const bfi2_organization_mean_score = bfi2_organization_sum/bfi2_organization_all.length;

        // productiveness
        const bfi2_productiveness_all = item_assignments.productiveness.map(index => item_labels[index - 1]);
        let bfi2_productiveness_sum = 0;

        bfi2_productiveness_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_productiveness_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_productiveness_sum += num_value;
            }
        });
        
        const bfi2_productiveness_sum_score = bfi2_productiveness_sum;
        const bfi2_productiveness_mean_score = bfi2_productiveness_sum/bfi2_productiveness_all.length;

        //responsibility
        const bfi2_responsibility_all = item_assignments.responsibility.map(index => item_labels[index - 1]);
        let bfi2_responsibility_sum = 0;

        bfi2_responsibility_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_responsibility_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_responsibility_sum += num_value;
            }
        });
        
        const bfi2_responsibility_sum_score = bfi2_responsibility_sum;
        const bfi2_responsibility_mean_score = bfi2_responsibility_sum/bfi2_responsibility_all.length;

        // anxiety
        const bfi2_anxiety_all = item_assignments.anxiety.map(index => item_labels[index - 1]);
        let bfi2_anxiety_sum = 0;

        bfi2_anxiety_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_anxiety_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_anxiety_sum += num_value;
            }
        });
        
        const bfi2_anxiety_sum_score = bfi2_anxiety_sum;
        const bfi2_anxiety_mean_score = bfi2_anxiety_sum/bfi2_anxiety_all.length;

        // depression
        const bfi2_depression_all = item_assignments.depression.map(index => item_labels[index - 1]);
        let bfi2_depression_sum = 0;

        bfi2_depression_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_depression_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_depression_sum += num_value;
            }
        });
        
        const bfi2_depression_sum_score = bfi2_depression_sum;
        const bfi2_depression_mean_score = bfi2_depression_sum/bfi2_depression_all.length;

        // emotional_volatility
        const bfi2_emotional_volatility_all = item_assignments.emotional_volatility.map(index => item_labels[index - 1]);
        let bfi2_emotional_volatility_sum = 0;

        bfi2_emotional_volatility_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_emotional_volatility_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_emotional_volatility_sum += num_value;
            }
        });
        
        const bfi2_emotional_volatility_sum_score = bfi2_emotional_volatility_sum;
        const bfi2_emotional_volatility_mean_score = bfi2_emotional_volatility_sum/bfi2_emotional_volatility_all.length;

        // intellectual_curiosity
        const bfi2_intellectual_curiosity_all = item_assignments.intellectual_curiosity.map(index => item_labels[index - 1]);
        let bfi2_intellectual_curiosity_sum = 0;

        bfi2_intellectual_curiosity_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_intellectual_curiosity_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_intellectual_curiosity_sum += num_value;
            }
        });
        
        const bfi2_intellectual_curiosity_sum_score = bfi2_intellectual_curiosity_sum;
        const bfi2_intellectual_curiosity_mean_score = bfi2_intellectual_curiosity_sum/bfi2_intellectual_curiosity_all.length;

        // aesthetic_sensitivity
        const bfi2_aesthetic_sensitivity_all = item_assignments.aesthetic_sensitivity.map(index => item_labels[index - 1]);
        let bfi2_aesthetic_sensitivity_sum = 0;

        bfi2_aesthetic_sensitivity_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_aesthetic_sensitivity_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_aesthetic_sensitivity_sum += num_value;
            }
        });
        
        const bfi2_aesthetic_sensitivity_sum_score = bfi2_aesthetic_sensitivity_sum;
        const bfi2_aesthetic_sensitivity_mean_score = bfi2_aesthetic_sensitivity_sum/bfi2_aesthetic_sensitivity_all.length;

        // creative_imagination
        const bfi2_creative_imagination_all = item_assignments.creative_imagination.map(index => item_labels[index - 1]);
        let bfi2_creative_imagination_sum = 0;
        
        bfi2_creative_imagination_all.forEach(([key, value]) => {
            const num_value = Number(value); 
            if (key.endsWith("R")) {
                // Reverse-scored items: subtract from the scale
                bfi2_creative_imagination_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
            } else {
                // Regular items: add to the scale
                bfi2_creative_imagination_sum += num_value;
            }
        });
        
        const bfi2_creative_imagination_sum_score = bfi2_creative_imagination_sum;
        const bfi2_creative_imagination_mean_score = bfi2_creative_imagination_sum/bfi2_creative_imagination_all.length;

        return  [[bfi2_extraversion_sum_score, bfi2_agreeableness_sum_score, bfi2_conscientiousness_sum_score, 
            bfi2_emotional_stability_sum_score, bfi2_openness_sum_score],

            [bfi2_sociability_sum_score, bfi2_assertiveness_sum_score, bfi2_energy_level_sum_score, bfi2_compassion_sum_score,
            bfi2_respectfulness_sum_score, bfi2_trust_sum_score, bfi2_organization_sum_score, bfi2_productiveness_sum_score,
            bfi2_responsibility_sum_score, bfi2_anxiety_sum_score, bfi2_depression_sum_score, bfi2_emotional_volatility_sum_score,
            bfi2_intellectual_curiosity_sum_score, bfi2_aesthetic_sensitivity_sum_score, bfi2_creative_imagination_sum_score],

            [bfi2_extraversion_mean_score, bfi2_agreeableness_mean_score, bfi2_conscientiousness_mean_score, 
            bfi2_emotional_stability_mean_score, bfi2_openness_mean_score],

            [bfi2_sociability_mean_score, bfi2_assertiveness_mean_score, bfi2_energy_level_mean_score, bfi2_compassion_mean_score,
            bfi2_respectfulness_mean_score, bfi2_trust_mean_score, bfi2_organization_mean_score, bfi2_productiveness_mean_score,
            bfi2_responsibility_mean_score, bfi2_anxiety_mean_score, bfi2_depression_mean_score, bfi2_emotional_volatility_mean_score,
            bfi2_intellectual_curiosity_mean_score, bfi2_aesthetic_sensitivity_mean_score, bfi2_creative_imagination_mean_score]];

    } else {

        return [[bfi2_extraversion_sum_score, bfi2_agreeableness_sum_score, bfi2_conscientiousness_sum_score, 
            bfi2_emotional_stability_sum_score, bfi2_openness_sum_score],

            [bfi2_extraversion_mean_score, bfi2_agreeableness_mean_score, bfi2_conscientiousness_mean_score, 
                bfi2_emotional_stability_mean_score, bfi2_openness_mean_score]];
        
    };
    

}