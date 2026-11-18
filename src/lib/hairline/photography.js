export default function definePhotography(HL, hairline) {
  const { Cam, fit, proj, facing, rings, prism, solid, put, poly, hull, open, mk, clamp, spring, stepS, register, pointer, disposer } = HL

  function mount({ stage, svg, read }, value) {
    const bag = disposer()
    const camera = Cam(45, .5, 2.18)
    fit(camera, [[-62, -36, 0], [57, 36, 76], [-10, 86, 39], [30, 0, 93]], 200, 164)
    const P = proj(camera)
    const front = facing(camera)
    const body = mk('g', {}, svg)
    put(solid(body), prism(P, front, ...rings(-61, -36, 57, 34, 8, 2), 7, 78))
    put(solid(body), prism(P, front, ...rings(-40, -21, 5, 9, 5, 1.4), 78, 91))
    put(solid(body), prism(P, front, ...rings(26, -23, 47, -3, 7, 1.5), 78, 84))
    const barrel = mk('path', { class: 'sil' }, svg)
    const rim = mk('path', { class: 'lo nf' }, svg)
    const glass = mk('path', { class: 'hi nf' }, svg)
    const extension = spring(19)
    let pointerX = null
    let reach = value
    let drawn

    const ring = (y, radius) => Array.from({ length: 56 }, (_, i) => {
      const angle = i * Math.PI / 28
      return P(-9 + radius * Math.cos(angle), y, 43 + radius * Math.sin(angle))
    })
    function draw() {
      if (extension.x === drawn) return
      drawn = extension.x
      const tip = 41 + drawn
      barrel.setAttribute('d', poly(hull([...ring(34, 27), ...ring(tip, 24)])))
      rim.setAttribute('d', poly(ring(tip, 22)))
      glass.setAttribute('d', open(ring(tip, 15).slice(3, 40)))
    }
    const loop = register(stage, dt => {
      const moving = stepS(extension, dt)
      draw()
      return moving
    })
    function aim() {
      extension.t = pointerX === null ? 19 : 13 + clamp((pointerX - 75) / 250, 0, 1) * reach
      read.textContent = pointerX === null ? 'rest' : 'focus'
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

  hairline({ name: 'photography', means: 'A camera lens extends and retracts as the pointer moves across it.', rules: [1, 3, 5, 8, 9], range: [12, 26, 43], tour: [[115, 150], [203, 165], [294, 170], null], mount })
}
