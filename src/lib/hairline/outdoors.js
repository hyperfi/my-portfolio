export default function defineOutdoors(HL, hairline) {
  const { Cam, fit, proj, facing, rings, prism, solid, put, poly, open, hull, mk, clamp, lerp, spring, stepS, register, pointer, disposer } = HL

  function mount({ stage, svg, read }, value) {
    const bag = disposer()
    const camera = Cam(45, .5, 1.69)
    fit(camera, [[-77, -62, 0], [77, 62, 0], [77, -62, 0], [-77, 62, 0], [-18, -3, 74]], 200, 165)
    const P = proj(camera)
    const front = facing(camera)
    put(solid(svg), prism(P, front, ...rings(-78, -63, 78, 63, 10, 2), -5, 0))
    const levels = [61, 52, 43, 34, 26, 18, 10].map((radius, i) => ({ radius, x: -12 - i * 1.7, y: 2 - i * .9, z: 6 + i * 9 }))

    function point(level, angle, z) {
      const irregularity = 1 + .1 * Math.sin(3 * angle + .8) + .045 * Math.cos(5 * angle + .25)
      return P(level.x + level.radius * irregularity * Math.cos(angle), level.y + .81 * level.radius * irregularity * Math.sin(angle), z)
    }
    const rimAngles = Array.from({ length: 76 }, (_, i) => i * Math.PI / 38)
    for (const level of levels) {
      const top = rimAngles.map(angle => point(level, angle, level.z))
      const base = rimAngles.map(angle => point(level, angle, level.z - (level.z === 6 ? 6 : 9)))
      mk('path', { class: 'sil', d: poly(hull([...base, ...top])) }, svg)
      mk('path', { class: 'lo nf', d: open(top.slice(0, 26)) }, svg)
    }

    const trail = levels.map((level, i) => point(level, i % 2 === 0 ? .25 : .72, level.z))
    mk('path', { class: 'dash nf', d: open(trail) }, svg)
    const marker = mk('circle', { class: 'dot', r: 2.8 }, svg)
    const position = spring(1.35)
    let reach = value
    let pointerX = null
    let drawn

    function draw() {
      if (position.x === drawn) return
      drawn = position.x
      const at = clamp(drawn, 0, trail.length - 1)
      const i = Math.min(Math.floor(at), trail.length - 2)
      marker.setAttribute('cx', lerp(trail[i][0], trail[i + 1][0], at - i))
      marker.setAttribute('cy', lerp(trail[i][1], trail[i + 1][1], at - i))
    }
    const loop = register(stage, dt => {
      const moving = stepS(position, dt)
      draw()
      return moving
    })
    function aim() {
      position.t = pointerX === null ? 1.35 : clamp((317 - pointerX) / 226, 0, 1) * reach
      read.textContent = pointerX === null ? 'rest' : 'trail'
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

  hairline({ name: 'outdoors', means: 'A trail marker follows a route up a stepped contour model.', rules: [1, 3, 5, 6, 9], range: [3, 5, 6], tour: [[286, 194], [202, 178], [114, 151], null], mount })
}
