---
layout: home

hero:
  name: "Archora UI"
  text: "Dark-first dashboards"
  tagline: "A dense, calm Vue 3 component library for dashboards and internal tools."
  actions:
    - theme: brand
      text: Get Started
      link: /guide/installation
    - theme: alt
      text: Browse Components
      link: /components/
    - theme: alt
      text: GitHub
      link: https://github.com/archora-dev/archora-ui

features:
  - title: Dark-first, light tuned
    details: Both themes shipped and verified — dark is the default, not an afterthought.
    icon: 🌑
  - title: Dense by default
    details: Data tables, virtual scrolling, filters and overlays — primitives for tools, not landing pages.
    icon: 📊
  - title: Token theming
    details: A few --arch-color-* base colors per data-theme; the rest derives via color-mix, SSR-safe at runtime.
    icon: 🎚️
  - title: Small & accessible
    details: Side-effect-free ESM (~0.6 kB per component, brotli) with axe-checked interactive components.
    icon: ♿
---

## A real screen, built from the kit

A dense observability view composed entirely of Archora components — stats, a
keyed data table with status badges and risk scores, and an event timeline.
Toggle the theme in the top bar to see dark and light.

<DashboardShowcase />
