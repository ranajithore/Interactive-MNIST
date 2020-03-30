        const canvas = document.querySelector('#canvas');
        const ctx = canvas.getContext('2d');
        const clearBtn = document.querySelector('#clear-btn');
        const predictBtn = document.querySelector('#predict-btn');
        var marginTop = 0;
        var marginLeft = 0;
        var painting = false;

        resizeCanvas();
        
        function resizeCanvas(){
            canvas.height = window.innerHeight/1.5;
            canvas.width = window.innerWidth/4;
            canvas.style.marginTop = '100px';
            canvas.style.marginLeft = '50px';
            marginTop = 100;
            marginLeft = 50;
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function startDraw(e){
            painting = true;
            draw(e);
        }

        function endDraw(){
            painting = false;
            ctx.beginPath();
        }

        function draw(e){
            if(!painting) return;
            ctx.lineWidth = 30;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'white';
            ctx.lineTo(e.clientX-marginLeft, e.clientY-marginTop);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX-marginLeft, e.clientY-marginTop);
        }

        function clearCanvas(){
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            $('#out-span').stop();
            $('#out-div').html('');
            $('#out-div').append('<span id="out-span" class="typed"></span>')
        }

        $('#predict-btn').click(function(){
            var imageURL = canvas.toDataURL('image/jpeg');
            $.ajax({
            type: "POST",
            url: '/predict',
            data: JSON.stringify(imageURL),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(data, textStatus, jqXHR){
                var str = 'Predicted number is: ' + data[1] + " and Prediction Probability is: " + data[0];
                $('#out-div').html('');
                $('#out-div').append('<span id="out-span" class="typed"></span>')
                $(function(){
                $("#out-span").typed({
                    strings: [str],
                    // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
                    stringsElement: null,
                    // typing speed
                    typeSpeed: -100,
                    // time before typing starts
                    startDelay: 200,
                    // backspacing speed
                    backSpeed: 20,
                    // time before backspacing
                    backDelay: 500,
                    // loop
                    loop: true,
                    // false = infinite
                    loopCount: 1,
                    // show cursor
                    showCursor: true,
                    // character for cursor
                    cursorChar: "|",
                    // attribute to type (null == text)
                    attr: null,
                    // either html or text
                    contentType: 'html',
                    // call when done callback function
                    callback: function() {
                    $('#out-span').stop();
                    $('#out-div').html('');
                    $('#out-div').append('<span id="out-span" class="typed">'+str+'</span>')
                    },
                    // starting callback function before each string
                    preStringTyped: function() {},
                    //callback for every typed string
                    onStringTyped: function() {},
                    // callback for reset
                    resetCallback: function() {}
                });
                });
            },
            })
        });

        // Event Listeners
        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mousemove', draw);
        window.addEventListener('resize', resizeCanvas);
        clearBtn.addEventListener('click', clearCanvas)

        $(function(){
            $("#draw-text").typed({
            strings: ['Draw a digit here'],
            // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
            stringsElement: null,
            // typing speed
            typeSpeed: 0,
            // time before typing starts
            startDelay: 500,
            // backspacing speed
            backSpeed: 20,
            // time before backspacing
            backDelay: 500,
            // loop
            loop: true,
            // false = infinite
            loopCount: 5,
            // show cursor
            showCursor: false,
            // character for cursor
            cursorChar: "|",
            // attribute to type (null == text)
            attr: null,
            // either html or text
            contentType: 'html',
            // call when done callback function
            callback: function() {},
            // starting callback function before each string
            preStringTyped: function() {},
            //callback for every typed string
            onStringTyped: function() {},
            // callback for reset
            resetCallback: function() {}
            });
        });

        /* ---- particles.js config ---- */

        particlesJS("particles-js", {
        "particles": {
            "number": {
            "value": 380,
            "density": {
                "enable": true,
                "value_area": 800
            }
            },
            "color": {
            "value": "#ffffff"
            },
            "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
            },
            "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
            },
            "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
            },
            "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
            },
            "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
            },
            "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
            }
        },
        "retina_detect": true
        });


        /* ---- stats.js config ---- */

        var count_particles, stats, update;
        stats = new Stats;
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
        count_particles = document.querySelector('.js-count-particles');
        update = function() {
        stats.begin();
        stats.end();
        if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
            count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
        }
        requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
