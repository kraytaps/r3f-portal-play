import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect } from "react";
import { AlwaysStencilFunc, DoubleSide, EquirectangularReflectionMapping, LinearEncoding, ReplaceStencilOp, Scene, TextureLoader, WebGLRenderTarget } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FillQuad } from './FillQuad'; 

const scene = new Scene();
scene.background = new TextureLoader().load(
    process.env.PUBLIC_URL + '/textures/galaxy.jpg',
    (texture) => {
        texture.encoding = LinearEncoding;
        texture.mapping = EquirectangularReflectionMapping;
    }
)

const target = new WebGLRenderTarget(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
    target.setSize(window.innerWidth, window.innerHeight);
});

export function Portal() {
    const model = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/portal.glb');
    const mask = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/portal_mask.glb');

    useFrame((state) => {
        state.gl.setRenderTarget(target);
        state.gl.render(scene, state.camera);
        state.gl.setRenderTarget(null);
    })

    useEffect(() => {
        if (!model) return;
        
        let modelMesh = model.scene.children[0];
        modelMesh.material.envMapIntensity = 3.5;

        let maskMesh = mask.scene.children[0];
        let maskMeshMat = maskMesh.material;
        maskMeshMat.side = DoubleSide;
        maskMeshMat.transparent = false;
        maskMeshMat.stencilWrite = true;
        maskMeshMat.stencilRef = 1;
        maskMeshMat.stencilFunc = AlwaysStencilFunc;
        maskMeshMat.stencilZPass = ReplaceStencilOp;
    }, [model, mask]);

    return (
        <>
            <primitive object={model.scene}/>
            <primitive object={mask.scene}/>
            <FillQuad map={target.texture} maskId={1}/>
        </>
    )
}
