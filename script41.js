    // Example array of objects
    const ridersData = [
        { 
          "dispatch rider's name": "Adeola Adebayo", 
          "delivery Area": "Ikeja", 
          "Number of deliveries": 12 
        },
        { 
          "dispatch rider's name": "Chinedu Okafor", 
          "delivery Area": "Yaba", 
          "Number of deliveries": 8 
        },
        { 
          "dispatch rider's name": "Ibrahim Yusuf", 
          "delivery Area": "Surulere", 
          "Number of deliveries": 15 
        },
        { 
          "dispatch rider's name": "Adebisi Olamide", 
          "delivery Area": "Lekki", 
          "Number of deliveries": 10 
        },
        { 
          "dispatch rider's name": "Ngozi Chukwu", 
          "delivery Area": "Victoria Island", 
          "Number of deliveries": 7 
        },
        { 
          "dispatch rider's name": "Segun Adeniran", 
          "delivery Area": "Ikorodu", 
          "Number of deliveries": 14 
        },
        { 
          "dispatch rider's name": "Fatima Suleiman", 
          "delivery Area": "Ajah", 
          "Number of deliveries": 9 
        },
        { 
          "dispatch rider's name": "Babatunde Owolabi", 
          "delivery Area": "Eko", 
          "Number of deliveries": 11 
        }
      ];


      
    const container = document.getElementById("scrollContainer");

    // Generate rows dynamically
    
    ridersData.forEach(rows =>{

        const dispatch_row = document.createElement("div")
        dispatch_row. className = "new-row"
        const radio = document.createElement("input")
        radio.type = "radio"
        radio.name = "action"
        radio.className = "radio-btn"
        dispatch_row.appendChild(radio)
        Object.keys(rows).forEach( key => {
            const header_span = document.createElement("span")
            header_span.className = "header"
            header_span.textContent = key
            if(key === "Number of deliveries"){
                rows[key] += " deliveries"
            }

            const body_span = document.createElement("span")
            body_span.className = "body"
            body_span.textContent = rows[key]
            if(key === "delivery Area"){
                body_span.classList.add("area")
            }

            if(key === "dispatch rider's name"){
                body_span.classList.add("name")
            }

            dispatch_row.appendChild(header_span)     
            dispatch_row.appendChild(body_span)
        }

        )
       
        
        container.appendChild(dispatch_row)
    }

    )