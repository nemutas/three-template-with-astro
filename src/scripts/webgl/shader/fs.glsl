uniform sampler2D tImage;
uniform vec2 uUvScale;
varying vec2 vUv;

void main() {
  vec2 uv = (vUv - 0.5) * uUvScale + 0.5;
  vec4 tex = texture2D(tImage, uv);

  gl_FragColor = tex;
}