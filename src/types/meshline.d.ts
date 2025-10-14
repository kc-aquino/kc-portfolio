import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { MaterialNode, BufferGeometryNode } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: BufferGeometryNode<MeshLineGeometry, typeof MeshLineGeometry>;
      meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
  }
}

export {};
