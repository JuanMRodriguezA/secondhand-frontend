import { defineStore } from 'pinia'

export const usePickupStore = defineStore('pickup', {
  state: () => ({
    points: [
      {
        id: 1,
        zone: 'Centro',
        location: 'Ciudad Vieja',
        address: 'Café La Farmacia, Ciudad Vieja 1234',
        schedule: 'Lunes a viernes 10:00 - 19:00'
      },
      {
        id: 2,
        zone: 'Cordón',
        location: 'Showroom por cita',
        address: 'Av. 18 de Julio 5678, Cordón',
        schedule: 'Con cita previa'
      },
      {
        id: 3,
        zone: 'Pocitos',
        location: 'Domicilio particular',
        address: 'Calle Solís 9012, Pocitos',
        schedule: 'A coordinar'
      }
    ]
  }),
  getters: {
    getAllPoints: (state) => state.points
  }
})