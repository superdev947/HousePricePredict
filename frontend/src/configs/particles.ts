// ** Particles Import
import { ISourceOptions } from '@tsparticles/engine'

export const particles: ISourceOptions = {
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      }
    },
    modes: {
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#9acd32'
    },
    links: {
      color: '#9acd32',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce'
      },
      random: false,
      speed: 5,
      straight: false
    },
    number: {
      density: {
        enable: true
      },
      value: 100
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: { min: 1, max: 5 }
    },
    shape: {
      type: 'circle'
    }
  },
  detectRetina: true
}
