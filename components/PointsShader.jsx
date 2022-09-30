export default {
  vertexShader: `
    uniform float time;
    uniform float cameraZ;
    attribute float size;
    
    varying vec3 vColor;
  
    void main() {
      vColor = color;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * cameraZ / -mv.z;
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
  
    varying vec3 vColor;
  
    void main() {
  
      gl_FragColor = vec4(vColor, 1.0);
    }
  `,
};
