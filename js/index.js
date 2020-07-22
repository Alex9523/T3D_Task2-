window.onload = function () {

    const width = window.innerWidth
    const height = window.innerHeight

    const canvas = document.querySelector('#canvas')

    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)


    const controls = new function(){
        this.rotationSpeed = 0.02
        this.color = '#ff9966'
        this.backgroundColor = '#000000'
    }

    const gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5)
    const controllerColor = gui.addColor(controls, 'color')
    const controllerBackgroundColor = gui.addColor(controls, 'backgroundColor')


    controllerColor.onChange(function(val){ //change color of cube
        materialCube.color.set(`${val}`); 
    })

    controllerBackgroundColor.onChange(function(val){   //change color of background
        renderer.setClearColor(`${val}`) 
     })

    const renderer = new THREE.WebGLRenderer({ canvas: canvas })

    renderer.setClearColor('#000000')

    const scene = new THREE.Scene()

    // const light = new THREE.AmbientLight(0xffffff)
    // scene.add(light)

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);

    const fov = 45;
    const aspect = width / height;
    const near = 0.1;
    const far = 1000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 1000)

    const geometryCube = new THREE.BoxGeometry(200, 200, 200, 4, 4)
    const materialCube = new THREE.MeshStandardMaterial()
    materialCube.color.set(0xff9966);


    const cube = new THREE.Mesh(geometryCube, materialCube)
    cube.rotation.set(0.4, 0.2, 0);

    scene.add(cube)


    //renderer.render(scene, camera)

    function loop(){
        cube.rotation.y += controls.rotationSpeed
        cube.rotation.x += controls.rotationSpeed

        renderer.render(scene, camera)
        requestAnimationFrame(() => {loop()})
    }

    
    loop()
}

