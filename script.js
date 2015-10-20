
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
      
/*========================= GET WEBGL CONTEXT ========================= */
var GL;

function initGL(canvas) {
  try {
    GL = canvas.getContext("experimental-webgl", {antialias: true});
    GL.viewportWidth = canvas.width;
    GL.viewportHeight = canvas.height;
  } catch (e) {
    alert("You are not webgl compatible :(") ;
    return false;
  }
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

var SHADER_PROGRAM;
var _Pmatrix;
var _Vmatrix;
var _Mmatrix;
var _color;
var _position;

function initShaders() {

  var shader_vertex=get_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
  var shader_fragment=get_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

  SHADER_PROGRAM=GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shader_vertex);
  GL.attachShader(SHADER_PROGRAM, shader_fragment);
  GL.linkProgram(SHADER_PROGRAM);

  _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
  _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
  _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");

  _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
  _position = GL.getAttribLocation(SHADER_PROGRAM, "position");

  GL.enableVertexAttribArray(_color);
  GL.enableVertexAttribArray(_position);

  GL.useProgram(SHADER_PROGRAM);
}



/*========================= THE TORUS ========================= */
//POINTS :

var TOURS_VERTEX;
var TORUS_FACES;
var radius = 2.8;
var faces;

function initBuffers() {

  var torus_vertex = [];
  var xyz = [];
  var x = 0;
  var y = 0;
  var z = 0;
  
  var colors = [0,0,0];
  var r = 0;
  var g = 0;
  var b = 0;

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

      torus_vertex = torus_vertex.concat(xyz);

      r = 0.5 + 0.4 * x;
      g = 0.5 + 0.4 * z;
      b = 0.5 + 0.4 * y;
      colors = [r,g,b];

      torus_vertex = torus_vertex.concat(colors);

    };
  }

  TOURS_VERTEX = GL.createBuffer ();
  GL.bindBuffer(GL.ARRAY_BUFFER, TOURS_VERTEX);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(torus_vertex), GL.STATIC_DRAW);

  faces = rings*sides*6;
  var torus_faces = [];
  var count = [];
  for(var i = 0; i < rings; i++) {
    for (var j = 0; j < sides+(rings-sides); j++) {
      count[0] = i + j * verticesPerRow;
      count[1] = (i + 1) + j * verticesPerRow;
      count[2] = i + (j + 1) * verticesPerRow;
      count[3] = (i + 1) + j * verticesPerRow;
      count[4] = (i + 1) + (j + 1) * verticesPerRow;
      count[5] = i + (j + 1) * verticesPerRow;

      torus_faces = torus_faces.concat(count);
    };
  }
  
  
  TORUS_FACES = GL.createBuffer ();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TORUS_FACES);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(torus_faces), GL.STATIC_DRAW);

}




/*========================= DRAWING ========================= */

function drawScene() {
  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);
  GL.clearColor(1.0, 1.0, 1.0, 1.0);
  GL.clearDepth(1.0);
}

var PROJMATRIX;
var MOVEMATRIX;
var VIEWMATRIX;

var time_old=0;
var offsetZ = 0;
var offsetX = 0;
var offsetY = 0;
var stepZ = 0;
var stepY = 0;
var stepX = 0;
var posX = 0;
var posY = 0;
var posZ = 0;

var p = 0;

function checkButton(mode) {
  p = mode;
}

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
    z -= 0.005;

  } else if (p == 1) {
    offsetZ = 20;
    offsetX = 2;

    stepZ = offsetZ/120;
    stepY = offsetY/120;
    stepX = offsetX/120;

    LIBS.set_I4(MOVEMATRIX);
    LIBS.rotateY(MOVEMATRIX, z);
    // LIBS.rotateX(MOVEMATRIX, LIBS.degToRad(posZ*4.5));
    LIBS.translateX(MOVEMATRIX, posX);
    LIBS.translateZ(MOVEMATRIX, -posZ);

    if (posX > offsetX+0.1) {
      posX -= stepX;
    } else if (posX < offsetX-0.1) {
      posX += stepX;
    } else {
      posX = offsetX;
    }

    if (posZ > offsetZ+0.1) {
      posZ -= stepZ;
    } else if (posZ < offsetZ-0.1) {
      posZ += stepZ;
    } else {
      posZ = offsetZ;
    }
  } else if (p == 2) {
    offsetZ = 20;
    offsetX = 7;

    stepZ = offsetZ/120;
    stepY = offsetY/120;
    stepX = offsetX/120;

    LIBS.set_I4(MOVEMATRIX);
    LIBS.rotateY(MOVEMATRIX, z);
    // LIBS.translateY(MOVEMATRIX, 12);
    LIBS.translateX(MOVEMATRIX, posX);
    LIBS.translateZ(MOVEMATRIX, -posZ);
    // LIBS.rotateX(MOVEMATRIX, LIBS.degToRad(90));

    if (posX > offsetX+0.1) {
      posX -= stepX;
    } else if (posX < offsetX-0.1) {
      posX += stepX;
    } else {
      posX = offsetX;
    }
    
    if (posZ > offsetZ+0.1) {
      posZ -= stepZ;
    } else if (posZ < offsetZ-0.1) {
      posZ += stepZ;
    } else {
      posZ = offsetZ;
    }
  } else {
    offsetZ = 20;
    offsetX = 1;

    stepZ = offsetZ/120;
    stepY = offsetY/120;
    stepX = offsetX/120;
    
    LIBS.set_I4(MOVEMATRIX);
    LIBS.rotateY(MOVEMATRIX, z);
    LIBS.translateX(MOVEMATRIX, posX);
    LIBS.translateZ(MOVEMATRIX, -posZ);

    // LIBS.rotateZ(MOVEMATRIX, LIBS.degToRad(posZ*4.5));
    // LIBS.rotateX(MOVEMATRIX, z);
    // LIBS.rotateY(MOVEMATRIX, LIBS.degToRad(90));
    z -= 0.01;

    if (posX > offsetX+0.1) {
      posX -= stepX;
    } else if (posX < offsetX-0.1) {
      posX += stepX;
    } else {
      posX = offsetX;
    }
    
    if (posZ > offsetZ+0.1) {
      posZ -= stepZ;
    } else if (posZ < offsetZ-0.1) {
      posZ += stepZ;
    } else {
      posZ = offsetZ;
    }
  }

  GL.viewport(0.0, 0.0, GL.viewportWidth, GL.viewportHeight);
  GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
  GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
  GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
  GL.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);
  GL.bindBuffer(GL.ARRAY_BUFFER, TOURS_VERTEX);
  GL.vertexAttribPointer(_position, 3, GL.FLOAT, false,4*(3+3),0);
  GL.vertexAttribPointer(_color, 3, GL.FLOAT, false,4*(3+3),3*4);
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TORUS_FACES);
  GL.drawElements(GL.TRIANGLES, faces, GL.UNSIGNED_SHORT, 0);

  GL.flush();

  window.requestAnimationFrame(animate);
};



function webGLStart(mode) {

  var CANVAS=document.getElementById("canvas");
  CANVAS.width=window.innerWidth;
  CANVAS.height=window.innerHeight;

  CANVAS.addEventListener("mousedown", mouseDown, false);
  CANVAS.addEventListener("mouseup", mouseUp, false);
  CANVAS.addEventListener("mouseout", mouseUp, false);
  CANVAS.addEventListener("mousemove", mouseMove, false);
  CANVAS.addEventListener("mousewheel",handleMouseWheel, false);

  /*========================= MATRIX ========================= */

  PROJMATRIX=LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1, 100);
  MOVEMATRIX=LIBS.get_I4();
  VIEWMATRIX=LIBS.get_I4();

  LIBS.translateZ(VIEWMATRIX, -3);
  LIBS.translateY(VIEWMATRIX, -radius+0.3);
  LIBS.rotateZ(VIEWMATRIX, LIBS.degToRad(90));
  var THETA=0,
      PHI=0;

  initGL(CANVAS);
  initShaders();
  initBuffers();
  drawScene();
  checkButton(mode);
  animate(0);
}

