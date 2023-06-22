import { Canvas } from '@react-three/fiber';
import { SceneContainer } from './SceneContainer';
import * as dat from 'lil-gui';

function App() {
    // console.log(dat)

    return <Canvas>
        <SceneContainer/>
    </Canvas>
}

export default App;