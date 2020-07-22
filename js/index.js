window.onload = function () {

    const width = window.innerWidth
    const height = window.innerHeight

    const canvas = document.querySelector('#canvas')

    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)


    const controllers = new function(){
        //controle colors
        this.color = '#ff9966'
        this.backgroundColor = '#000000'

        //control light
        this.intensive = 1
    }

    const gui = new dat.GUI();

    const controllerColor = gui.addColor(controllers, 'color')
    const controllerBackgroundColor = gui.addColor(controllers, 'backgroundColor')
    const controllerIntensive = gui.add(controllers, 'intensive')


    controllerColor.onChange(function(val){ //change color of cube
        materialCube.color.set(`${val}`); 
    })

    controllerBackgroundColor.onChange(function(val){   //change color of background
        renderer.setClearColor(`${val}`) 
     })

    // controllerIntensive.onChange(function(val){ //change color of cube
    //     controls.intensive = val   
    // })

    const renderer = new THREE.WebGLRenderer({ canvas: canvas })

    renderer.setClearColor('#000000')

    const scene = new THREE.Scene()

    // const light = new THREE.AmbientLight(0xffffff)
    // scene.add(light)

    const color = 0xFFFFFF;
    //const intensive = 1
    const light = new THREE.AmbientLight(color, controllers.intensive);
    scene.add(light);

    const fov = 45;
    const aspect = width / height;
    const near = 0.1;
    const far = 5000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 1000)

    const geometryCube = new THREE.BoxGeometry(200, 200, 200, 4, 4)
    const materialCube = new THREE.MeshStandardMaterial()//{wireframe: true} грани
    
    materialCube.color.set(0xff9966);


    const cube = new THREE.Mesh(geometryCube, materialCube)
    cube.rotation.set(0.4, 0.2, 0);

    scene.add(cube)

    const control = new THREE.OrbitControls (camera, canvas);
    control.update();
    control.target.set(0, 5, 0);
    
    function loop(){
    
        renderer.render(scene, camera)
       
        requestAnimationFrame(() => {loop()})
    }

    
    loop()
}

