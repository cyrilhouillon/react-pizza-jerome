export const DefaultPlanning = [
    {"horaire" : "18h00 - 18h10", "reservation" : []}, 
    {"horaire" : "18h10 - 18h20", "reservation" : []},
    {"horaire" : "18h20 - 18h30", "reservation" : []},
    {"horaire" : "18h30 - 18h40", "reservation" : []}, 
    {"horaire" : "18h40 - 18h50", "reservation" : []}, 
    {"horaire" : "19h00 - 19h10", "reservation" : []}, 
    {"horaire" : "19h10 - 19h20", "reservation" : []},
    {"horaire" : "19h20 - 19h30", "reservation" : []},
    {"horaire" : "19h30 - 19h40", "reservation" : []},
    {"horaire" : "19h40 - 19h50", "reservation" : []},
    {"horaire" : "19h50 - 20h00", "reservation" : []},
    {"horaire" : "20h00 - 20h10", "reservation" : []},
    {"horaire" : "20h10 - 20h20", "reservation" : []},
    {"horaire" : "20h20 - 20h30", "reservation" : []},
    {"horaire" : "20h30 - 20h40", "reservation" : []},
    {"horaire" : "20h40 - 20h50", "reservation" : []},
    {"horaire" : "20h50 - 21h00", "reservation" : []},
    {"horaire" : "21h00 - 21h10", "reservation" : []},
    {"horaire" : "21h10 - 21h20", "reservation" : []},
    {"horaire" : "21h20 - 21h30", "reservation" : []},
    {"horaire" : "21h30 - 21h40", "reservation" : []},
    {"horaire" : "21h40 - 21h50", "reservation" : []},
    {"horaire" : "21h50 - 22h00", "reservation" : []}
];

export const DefaultPlanningv2 = [
    {"horaire" : "18h00 - 18h10", "reservation" : []}, 
    {"horaire" : "18h10 - 18h20", "reservation" : []},
    {"horaire" : "18h20 - 18h30", "reservation" : []},
    {"horaire" : "18h30 - 18h40", "reservation" : []}, 
    {"horaire" : "18h40 - 18h50", "reservation" : []}, 
    {"horaire" : "19h00 - 19h10", "reservation" : []}, 
    {"horaire" : "19h10 - 19h20", "reservation" : []},
    {"horaire" : "19h20 - 19h30", "reservation" : []},
    {"horaire" : "19h30 - 19h40", "reservation" : []},
    {"horaire" : "19h40 - 19h50", "reservation" : []},
    {"horaire" : "19h50 - 20h00", "reservation" : []},
    {"horaire" : "20h00 - 20h10", "reservation" : []},
    {"horaire" : "20h10 - 20h20", "reservation" : []},
    {"horaire" : "20h20 - 20h30", "reservation" : []},
    {"horaire" : "20h30 - 20h40", "reservation" : []},
    {"horaire" : "20h40 - 20h50", "reservation" : []},
    {"horaire" : "20h50 - 21h00", "reservation" : []},
    {"horaire" : "21h00 - 21h10", "reservation" : []},
    {"horaire" : "21h10 - 21h20", "reservation" : []},
    {"horaire" : "21h20 - 21h30", "reservation" : []},
    {"horaire" : "21h30 - 21h40", "reservation" : []},
    {"horaire" : "21h40 - 21h50", "reservation" : []},
    {"horaire" : "21h50 - 22h00", "reservation" : []}
];

export const timeIncrements = [];

let index = 1;

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 6; j++) {
    const start = `${18 + i}:${j * 10}`.padEnd(5, "0");
    let end = null;
    if (j < 5) {
      end = `${18 + i}:${(j + 1) * 10}`.padEnd(5, "0");
    } else {
      end = `${19 + i}:00`.padStart(5, "0");
    }
    timeIncrements.push({
      "creneau": `${start} - ${end}`,
      "dispo": 6
  });
    index++;
  }
}

