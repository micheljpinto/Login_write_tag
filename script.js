        (function() {
                document.addEventListener('DOMContentLoaded', function () {
                document.addEventListener('DOMContentLoaded', receiveState());
                document.addEventListener('DOMContentLoaded', getData());
                //DADOS FORMS 
                document.addEventListener('submit')

                const returnstate = "/returnstate"
                const url = "/writeatuador";
                var returnStates;
                //SLIDE BUTTON
                var checkClassSwitch = document.querySelectorAll('.switch input[type=checkbox]')
                checkClassSwitch.forEach(function (check) {
                    check.addEventListener('click', check_switchIndex);
                })
                var changeStatus;
                function check_switchIndex(event) {
                    //retorna status do objeto button
                    let swIndex = Array.from(checkClassSwitch).indexOf(event.target)
                    let status = checkClassSwitch[swIndex].checked
                    let id = checkClassSwitch[swIndex].id;
                    changeStatus = checkClassSwitch[swIndex].parentNode.parentNode.childNodes[3]
                    console.log(changeStatus.previousSibling.previousSibling);
                    sendJSON(varConcat(id, status));
                }

                //FIM SLIDE BUTTON
                function varConcat(pos, Status) {
                    let obj = {
                        id: pos,
                        status: Status
                    }
                    return obj
                }
                var sucess = "";
                function sendJSON(json) {
                    // Creating a XHR object
                    let xhr = new XMLHttpRequest();
                    // open a connection
                    xhr.open("POST", url, true);
                    xhr.withCredentials = true;
                    // Set the request header i.e. which type of content you are sending
                    xhr.setRequestHeader("Content-Type", "application/json");
                    // Create a state change callback
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            // Print received data from server
                            sucess = parseInt(this.responseText);
                            console.log('return Endpoint: ' + sucess);
                            if (sucess == 1) {
                                changeStatus.textContent = "Ligado"
                                status = "true"
                                changeStatus.previousSibling.previousSibling.style.backgroundColor =
                                    "green"
                            }
                            if (sucess == 0) {
                                changeStatus.textContent = "Desligado";
                                status = "false"
                                changeStatus.previousSibling.previousSibling.style.backgroundColor =
                                    "red";
                            } else {
                            }
                        } else {
                            console.log("Mensagem não enviada");
                            changeStatus.textContent == "Ligado" ? status = "true" : status = "false";
                            sucess = "3"
                        }
                    };
                    // Converting JSON data to string
                    var data = JSON.stringify(json);
                    console.log(data);
                    //console.log(sucess);
                    // Sending data with the request
                    xhr.send(data);
                    return sucess;
                }
                function receiveState() {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            adjustInitiState(this.responseText);
                        }
                    };
                    xhttp.open("GET", "/returnstate", true);
                    xhttp.send();
                }
                function adjustInitiState(result) {
                    /*{"actuators":[{"id":"OUT1","status":false},{"id":"OUT2","status":false},
                    {"id":"OUT3","status":false},{"id":"OUT4","status":false}]} */
                    var json = JSON.parse(result);
                    console.log(json.actuators[0].id);
                    for (let index = 0; index < checkClassSwitch.length; index++) {
                        let jsonStatus = json.actuators[index];
                        let changeOnOffLabel = checkClassSwitch[index].parentNode.parentNode.childNodes[3];
                        let changeRedGreenBackground = changeOnOffLabel.previousElementSibling
                        if (jsonStatus.status) {
                            changeOnOffLabel.textContent = "Ligado";
                            checkClassSwitch[index].checked = "true";
                            changeRedGreenBackground.style.backgroundColor = "green";
                        } else {
                            changeOnOffLabel.textContent = "Desligado";
                            changeRedGreenBackground.style.backgroundColor = "red";
                        }
                    }
                }
                function getData() {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                printSensors(this.responseText);
                }
                };
                xhttp.open("GET", "returnsensors", true);
                xhttp.send();
                }
                window.addEventListener ('load', function () {
                    setInterval (getData, 7000);
                }, false);
                function printSensors(resp){
                   var json=JSON.parse(resp);
                   console.log(json.temp);
                   document.getElementById("temp1").innerHTML=json.temp; 
                   document.getElementById("hum1").innerText=json.hum;
                   document.getElementById("lum1").innerHTML=json.lum;
                }
                
            })
        })()