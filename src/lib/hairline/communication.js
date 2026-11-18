export default function defineCommunication(HL, hairline) {
  const { Cam, fit, proj, facing, rings, prism, solid, put, poly, open, mk, clamp, spring, stepS, register, pointer, disposer } = HL

  function mount({ stage, svg, read }, value) {
    const bag = disposer()
    const camera = Cam(45, .5, 1.82)
    fit(camera, [[-69, 20, 0], [69, 20, 0], [-67, -9, 112], [67, -9, 112]], 200, 160)
    const P = proj(camera)
    const front = facing(camera)
    const screen = mk('g', {}, svg)
    put(solid(screen), prism(P, front, ...rings(-69, -25, -46, 20, 5, 1.2), 0, 5))
    put(solid(screen), prism(P, front, ...rings(46, -25, 69, 20, 5, 1.2), 0, 5))
    for (const x of [-52, 52]) {
      put(solid(screen), prism(P, front, ...rings(x - 3, -16, x + 3, -9, 2, .7), 5, 35))
    }
    const frame = [[-67, 32], [-64, 28], [64, 28], [67, 32], [67, 108], [64, 112], [-64, 112], [-67, 108]]
    mk('path', { class: 'sil', d: poly(frame.map(([x, z]) => P(x, -9, z))) }, screen)
    mk('path', { class: 'lo nf', d: poly([[-62, 33], [62, 33], [62, 107], [-62, 107]].map(([x, z]) => P(x, -8, z))) }, screen)
    mk('path', { class: 'dash nf', d: open([P(-55, -7, 70), P(55, -7, 70)]) }, screen)
    const wave = x => 70 + 20 * Math.sin((x + 9) / 12) * Math.exp(-(((x - 5) / 43) ** 2))
    const trace = Array.from({ length: 111 }, (_, i) => i - 55)
    mk('path', { class: 'sil nf', d: open(trace.map(x => P(x, -7, wave(x)))) }, screen)
    const segment = mk('path', { class: 'hi nf' }, screen)
    const marker = mk('circle', { class: 'dot', r: 2.4 }, screen)
    const cursor = spring(-22)
    let pointerX = null
    let reach = value
    let drawn
    const from = P(-55, -7, 70)[0]
    const to = P(55, -7, 70)[0]

    function draw() {
      if (cursor.x === drawn) return
      drawn = cursor.x
      const points = trace.filter(x => Math.abs(x - drawn) <= 8).map(x => P(x, -7, wave(x)))
      segment.setAttribute('d', open(points))
      const [cx, cy] = P(drawn, -7, wave(drawn))
      marker.setAttribute('cx', cx)
      marker.setAttribute('cy', cy)
    }
    const loop = register(stage, dt => {
      const moving = stepS(cursor, dt)
      draw()
      return moving
    })
    function aim() {
      cursor.t = pointerX === null ? -22 : clamp((pointerX - from) / (to - from) * 2 - 1, -1, 1) * reach
      read.textContent = pointerX === null ? 'rest' : 'wave'
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

  hairline({ name: 'communication', means: 'A presentation screen traces a point along an illustrative wave.', rules: [1, 3, 4, 7, 10], range: [32, 45, 54], tour: [[103, 138], [206, 142], [288, 170], null], mount })
}
