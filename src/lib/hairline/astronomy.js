export default function defineAstronomy(HL, hairline) {
  const { Cam, fit, proj, facing, rings, prism, solid, put, poly, hull, open, mk, clamp, spring, stepS, register, pointer, disposer } = HL

  function mount({ stage, svg, read }, value) {
    const bag = disposer()
    const camera = Cam(45, .5, 2.17)
    fit(camera, [[-68, -48, 0], [68, 48, 0], [-55, 0, 83], [62, 0, 141], [21, 54, 141]], 200, 164)
    const P = proj(camera)
    const front = facing(camera)
    const tripod = mk('g', {}, svg)
    for (const [x, y] of [[-46, -24], [46, -20], [-5, 51]]) {
      const leg = [P(-3, -3, 81), P(3, 3, 81), P(x + 3, y + 2, 3), P(x - 3, y - 2, 3)]
      mk('path', { class: 'sil', d: poly(hull(leg)) }, tripod)
      mk('path', { class: 'lo nf', d: open([P(0, 0, 72), P(x * .92, y * .92, 10)]) }, tripod)
      put(solid(tripod), prism(P, front, ...rings(x - 6, y - 5, x + 6, y + 5, 3, 1), 0, 4))
    }
    put(solid(tripod), prism(P, front, ...rings(-12, -12, 12, 12, 6, 1.5), 78, 96))
    const tube = mk('path', { class: 'sil' }, svg)
    const eyepiece = mk('path', { class: 'sil' }, svg)
    const collar = mk('path', { class: 'lo nf' }, svg)
    const hood = mk('path', { class: 'sil' }, svg)
    const glass = mk('path', { class: 'hi nf' }, svg)
    const angle = spring(.28)
    let pointerX = null
    let reach = value
    let drawn

    // Cross sections perpendicular to the telescope axis, projected in paint order.
    function ring(offset, radius, turn) {
      const bearing = turn - .38
      const x = Math.cos(bearing), y = Math.sin(bearing)
      return Array.from({ length: 48 }, (_, i) => {
        const around = i * Math.PI / 24
        const side = radius * Math.cos(around)
        const up = radius * Math.sin(around)
        const along = offset * .94 - up * .34
        return P(along * x - side * y, along * y + side * x, 100 + .34 * offset + .94 * up)
      })
    }
    function draw() {
      if (angle.x === drawn) return
      drawn = angle.x
      const shell = (a, b, r) => poly(hull([...ring(a, r, drawn), ...ring(b, r, drawn)]))
      eyepiece.setAttribute('d', shell(-58, -43, 6))
      tube.setAttribute('d', shell(-46, 51, 11))
      collar.setAttribute('d', poly(ring(-24, 11.4, drawn)))
      hood.setAttribute('d', shell(37, 59, 14))
      glass.setAttribute('d', poly(ring(59, 10, drawn)))
    }
    const loop = register(stage, dt => {
      const moving = stepS(angle, dt)
      draw()
      return moving
    })
    function aim() {
      angle.t = pointerX === null ? .28 : .28 + clamp((pointerX - 200) / 140, -1, 1) * reach
      read.textContent = pointerX === null ? 'rest' : 'aim'
      loop.wake()
    }
    bag.add(loop.unregister)
    bag.add(pointer(stage, {
      move: ([x]) => { pointerX = x; aim() },
      leave: () => { pointerX = null; aim() }
    }))
    bag.add(() => svg.replaceChildren())
    read.textContent = 'rest'
    draw()
    return { set: v => { reach = v; aim() }, destroy: bag.dispose }
  }

  hairline({ name: 'astronomy', means: 'A telescope on a tripod turns to follow the pointer across the panel.', rules: [1, 3, 5, 8, 9], range: [.26, .5, .69], tour: [[99, 145], [201, 119], [306, 147], null], mount })
}
