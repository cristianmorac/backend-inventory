const dateLegible = () => {
    const fecha = new Date()
    const msg = new String(fecha)
    const Fechanow = msg.split('GMT')
    return Fechanow[0]
}

module.exports = dateLegible