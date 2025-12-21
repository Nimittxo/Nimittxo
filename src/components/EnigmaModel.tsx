import { useGLTF } from "@react-three/drei"

export function EnigmaModel() {
  const { scene } = useGLTF("/ww2/enigma_machine.glb")
  return <primitive object={scene} scale={1.4} />
}
