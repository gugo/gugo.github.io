var main=function(p) {
  var CANVAS=document.getElementById("canvas");
  CANVAS.width=window.innerWidth;
  CANVAS.height=window.innerHeight;

  /*========================= CAPTURE MOUSE EVENTS ========================= */
  var AMORTIZATION=0.95;
  var drag=false;   
  var old_x, old_y;   
  var dX=0, dY=0;

  var mouseDown=function(e) {
    drag=true;
    old_x=e.pageX, old_y=e.pageY;
    e.preventDefault();
    return false;
  };
    
  var mouseUp=function(e){
    drag=false;
  };
    
  var mouseMove=function(e) {
    if (!drag) return false;
    dX=(e.pageX-old_x)*0.5*Math.PI/CANVAS.width,
    dY=(e.pageY-old_y)*0.5*Math.PI/CANVAS.height;
    THETA+=dX;
    PHI+=dY;
    old_x=e.pageX, old_y=e.pageY;
    e.preventDefault();
  };

  var z=-6.0;

  function handleMouseWheel(event){
    var delta = 0;
    if (!event) /* For IE. */
      event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
      delta = event.wheelDelta/120;
    } else if (event.detail) { /** Mozilla case. */
    /** In Mozilla, sign of delta is different than in IE.
    * Also, delta is multiple of 3.
    */
      delta = -event.detail/3;
    }
    /** If delta is nonzero, handle it.
    * Basically, delta is now positive if wheel was scrolled up,
    * and negative, if wheel was scrolled down.
    */
    if (delta)
      handleScroll(delta);
    /** Prevent default actions caused by mouse wheel.
    * That might be ugly, but we handle scrolls somehow
    * anyway, so don’t bother here..
    */
    if (event.preventDefault)
      event.preventDefault();
      event.returnValue = false;
  }

  function handleScroll(delta) {
    if (delta < 0)
      z=z-0.04;
    else
      z=z+0.04;
  }
         
  CANVAS.addEventListener("mousedown", mouseDown, false);
  CANVAS.addEventListener("mouseup", mouseUp, false);
  CANVAS.addEventListener("mouseout", mouseUp, false);
  CANVAS.addEventListener("mousemove", mouseMove, false);
  CANVAS.addEventListener("mousewheel",handleMouseWheel, false);


  /*========================= GET WEBGL CONTEXT ========================= */
  var GL;

  try {
    GL = CANVAS.getContext("experimental-webgl", {antialias: true});
  } catch (e) {
    alert("You are not webgl compatible :(") ;
    return false;
  }


  /*========================= SHADERS ========================= */
  /*jshint multistr: true */

  var shader_vertex_source="\n\
  attribute vec3 position;\n\
  uniform mat4 Pmatrix;\n\
  uniform mat4 Vmatrix;\n\
  uniform mat4 Mmatrix;\n\
  attribute vec3 color; //the color of the point\n\
  varying vec3 vColor;\n\
  void main(void) { //pre-built function\n\
  gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);\n\
  vColor=color;\n\
  }";

  var shader_fragment_source="\n\
  precision mediump float;\n\
  varying vec3 vColor;\n\
  void main(void) {\n\
  gl_FragColor = vec4(vColor, 1.);\n\
  }";

  var get_shader=function(source, type, typeString) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      alert("ERROR IN "+typeString+ " SHADER : " + GL.getShaderInfoLog(shader));
      return false;
    }
    return shader;
  };

  var shader_vertex=get_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
  var shader_fragment=get_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

  var SHADER_PROGRAM=GL.createProgram();

  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);

  GL.linkProgram(SHADER_PROGRAM);

  var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
  var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
  var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");

  var _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
  var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");

  GL.enableVertexAttribArray(_color);
  GL.enableVertexAttribArray(_position);

  GL.useProgram(SHADER_PROGRAM);

  /*========================= THE TORUS ========================= */
  //POINTS :
  var cube_vertex = [];
  var xyz = [];
  var x = 0;
  var y = 0;
  var z = 0;
  
  var colors = [0,0,0];
  var r = 0;
  var g = 0;
  var b = 0;

  var radius = 2.8;
  var ringRadius = 1.2;
  var maxRadius = radius + ringRadius;

  var sides = 48;
  var rings = 48;

  var verticesPerRow = sides + 1;
  var verticesPerCol = rings + 1;

  var verticesTotal = verticesPerRow * verticesPerCol;

  var alpha = 0;
  var beta = 0;

  var vertAngularStep = (360) / rings;
  var orizAngularStep = (360) / sides;

  var colorStep = 1 / verticesPerRow;
  var colorFade = 1 / verticesPerCol;
  
  for(var i = 0; i < verticesPerCol; i++) {
    alpha = LIBS.degToRad(vertAngularStep * i);
    
    for (var j = 0; j < verticesPerRow; j++) {
      beta = LIBS.degToRad(orizAngularStep * j);
      x = Math.cos(alpha) * (radius + ringRadius * Math.cos(beta));
      y = ringRadius * Math.sin(beta);
      z = Math.sin(alpha) * (radius+ringRadius * Math.cos(beta));
      xyz = [x,y,z];

      cube_vertex = cube_vertex.concat(xyz);

      r = 0.5 + 0.4 * x;
      g = 0.5 + 0.4 * z;
      b = 0.5 + 0.4 * y;
      colors = [r,g,b];

      cube_vertex = cube_vertex.concat(colors);

    };
  }
  
  // console.log(cube_vertex);
  

  var CUBE_VERTEX= GL.createBuffer ();
  GL.bindBuffer(GL.ARRAY_BUFFER, CUBE_VERTEX);
  GL.bufferData(GL.ARRAY_BUFFER,
                new Float32Array(cube_vertex),
    GL.STATIC_DRAW);

  var faces = rings*sides*6;
  var cube_faces = [];
  var count = [];
  for(var i = 0; i < rings; i++) {
    for (var j = 0; j < sides+(rings-sides); j++) {
      count[0] = i + j * verticesPerRow;
      count[1] = (i + 1) + j * verticesPerRow;
      count[2] = i + (j + 1) * verticesPerRow;
      count[3] = (i + 1) + j * verticesPerRow;
      count[4] = (i + 1) + (j + 1) * verticesPerRow;
      count[5] = i + (j + 1) * verticesPerRow;

      cube_faces = cube_faces.concat(count);
    };
  }
  
  // console.log(cube_faces);
  
  
  
  var CUBE_FACES= GL.createBuffer ();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(cube_faces),
    GL.STATIC_DRAW);

  /*========================= MATRIX ========================= */

  var PROJMATRIX=LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1, 100);
  var MOVEMATRIX=LIBS.get_I4();
  var VIEWMATRIX=LIBS.get_I4();



  LIBS.translateZ(VIEWMATRIX, -3);
  LIBS.translateY(VIEWMATRIX, -radius+0.3);
  LIBS.rotateZ(VIEWMATRIX, LIBS.degToRad(90));
  var THETA=0,
      PHI=0;

  /*========================= DRAWING ========================= */
  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);
  GL.clearColor(1.0, 1.0, 1.0, 1.0);
  GL.clearDepth(1.0);
  


  var time_old=0;
  var stepZ = z;
  var stepY = 0;

  var animate=function(time) {
    time_old=time;
    //console.log(z);
    // var dt=time-time_old;
    //    if (!drag) {
    //        dX*=AMORTIZATION, dY*=AMORTIZATION;
    //        THETA+=dX, PHI+=dY;
    //    }
    if(p == 0) {
      
      LIBS.set_I4(MOVEMATRIX);
      LIBS.rotateY(MOVEMATRIX, z);
      z -= 0.005


    } else if (p == 1) {
      LIBS.set_I4(MOVEMATRIX);
      LIBS.rotateY(MOVEMATRIX, z);
      LIBS.rotateX(MOVEMATRIX, stepY);
      LIBS.translateX(MOVEMATRIX, -stepZ/10);
      LIBS.translateZ(MOVEMATRIX, stepZ);

      stepY -= 0.05
      if (stepZ > -20) {
        stepZ -= 0.05;
      } else {
        stepZ = -20;
      }
    } else if (p == 2) {
      LIBS.set_I4(MOVEMATRIX);
      LIBS.translateX(MOVEMATRIX, 0.4);
      LIBS.translateZ(MOVEMATRIX, -20);
      LIBS.rotateZ(MOVEMATRIX, LIBS.degToRad(0));
    } else {
      LIBS.set_I4(MOVEMATRIX);
      LIBS.translateY(MOVEMATRIX, 12);
      LIBS.translateX(MOVEMATRIX, 7);
      LIBS.translateZ(MOVEMATRIX, -20);
      LIBS.rotateX(MOVEMATRIX, LIBS.degToRad(90));
    }

    // console.log(stepZ);
    
    
    // LIBS.rotateX(MOVEMATRIX, THETA);
    // LIBS.rotateZ(MOVEMATRIX, PHI);
    
      
    
    

    GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
    GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
    GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
    GL.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);
    GL.bindBuffer(GL.ARRAY_BUFFER, CUBE_VERTEX);
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false,4*(3+3),0);
    GL.vertexAttribPointer(_color, 3, GL.FLOAT, false,4*(3+3),3*4);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
    GL.drawElements(GL.TRIANGLES, faces, GL.UNSIGNED_SHORT, 0);

    GL.flush();

    window.requestAnimationFrame(animate);
  };

  animate(0);
};