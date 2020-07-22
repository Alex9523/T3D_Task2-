window.onload = function () {

    const width = window.innerWidth
    const height = window.innerHeight

    const canvas = document.querySelector('#canvas')

    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)

    const renderer = new THREE.WebGLRenderer({ canvas: canvas })

    renderer.setClearColor('#000000')

    const scene = new THREE.Scene()

// -----LIGHT
    const colorLight = 0xddeeff;
    let intensity = 1
    const light = new THREE.AmbientLight(colorLight, intensity);
    scene.add(light);

    const colorForSecondLight1 = 0xddeeff
    const colorForSecondLight2 = 0x080820
    const intensity2 = 1
    const secondLight = new THREE.HemisphereLight(colorForSecondLight1, colorForSecondLight2, intensity2);
    scene.add(secondLight)
    

//-----CAMERA
    const fov = 45;
    const aspect = width / height;
    const near = 0.1;
    const far = 5000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 1000)


    //---GEOMETRY AND MATERIAL
    const colorCube = '#6d95cd'
    const geometryCube = new THREE.BoxGeometry(200, 200, 200, 4, 4)
    const materialCube = new THREE.MeshStandardMaterial({color: colorCube})//{wireframe: true} грани



//----MESH
    const cube = new THREE.Mesh(geometryCube, materialCube)
    cube.rotation.set(0.4, 0.2, 0);

    scene.add(cube)
 //--- DAT.GUI

    const gui = new dat.GUI({ autoPlace: true });

    class ColorGUIHelper {
        constructor(object, prop) {
            this.object = object;
            this.prop = prop;
        }
        get value() {
            return `#${this.object[this.prop].getHexString()}`;
        }
        set value(hexString) {
            this.object[this.prop].set(hexString);
        }
    }

    gui.addColor(new ColorGUIHelper(materialCube, 'color'), 'value').name('cube Color')   //change color of cube
    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('first Light Color')  // change color of light
    gui.add(light, 'intensity', 0, 4, 0.01); // change intensity of light

    gui.addColor(new ColorGUIHelper(secondLight, 'color'), 'value').name('second light Color')  // change color of second light
    gui.add(secondLight, 'intensity', 0, 4, 0.01); // change intensity of second light

// ----ORBIT CONTROLS
    const control = new THREE.OrbitControls(camera, canvas);
    control.update();
    control.target.set(0, 5, 0);


    function loop() {
        renderer.render(scene, camera)
        requestAnimationFrame(() => { loop() })
    }

    loop()
}

