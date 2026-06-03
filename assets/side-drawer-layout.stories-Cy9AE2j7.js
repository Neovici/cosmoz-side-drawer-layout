import{i as e}from"./preload-helper-usAeo7Bx.js";import{W as t}from"./iframe-BoZRiVsE.js";import{c as n,f as r,l as i,n as a,o,r as s,t as c,u as l}from"./cosmoz-side-panel-Bo-f-0fC.js";var u,d=e((()=>{a(),u=l(class extends i{update(){return this.state.host}})})),f,p=e((()=>{a(),d(),f=e=>{let t=u(),r=o(()=>new CSSStyleSheet,[]);n(()=>{t.shadowRoot.adoptedStyleSheets=[...t.shadowRoot.adoptedStyleSheets,r]},[]),n(()=>{r.replaceSync(e)},[e])}})),m,h,g,_=e((()=>{p(),a(),m=(e,t)=>{let n=parseInt(String(e??t),10);return Number.isNaN(n)?t:n},h=e=>{let i=m(e.leftBreakpoint,1024),a=m(e.rightBreakpoint,1024);return n(()=>{let t=0,n=new ResizeObserver(n=>{let r=n[0].contentRect.width;r<t&&(t>=i&&r<i&&e.dispatchEvent(new CustomEvent(`close`,{detail:{side:`left`}})),t>=a&&r<a&&e.dispatchEvent(new CustomEvent(`close`,{detail:{side:`right`}}))),t=r});return n.observe(e),()=>n.unobserve(e)},[i,a]),f(r`
		@container (min-width: ${i}px) {
			.side.left {
				position: static;
				box-shadow: none;
				z-index: unset;
			}

			:host(:has([slot="left-drawer"])) .click-layer {
				display: none;
			}

			:host(:has([slot="left-drawer"])) {
				--left-drawer-current-width: var(--left-drawer-width);
				--cosmoz-side-drawer-layout-gap: 5px;
			}
		}
	`),f(r`
		@container (min-width: ${a}px) {
			.side.right {
				position: static;
				box-shadow: none;
				z-index: unset;
			}

			:host(:has([slot="right-drawer"])) .click-layer {
				display: none;
			}

			:host(:has([slot="right-drawer"])) {
				--right-drawer-current-width: var(--right-drawer-width);
				--cosmoz-side-drawer-layout-gap: 5px;
			}
		}
	`),t`
		<div class="wrapper">
			<slot name="left-drawer" class="side left"></slot>
			<div class="main-wrapper">
				<div
					class="click-layer"
					@click=${()=>e.dispatchEvent(new CustomEvent(`close`))}
				></div>
				<slot class="main" part="main"></slot>
			</div>
			<slot name="right-drawer" class="side right"></slot>
		</div>
	`},g=r`
	.click-layer {
		position: absolute;
		z-index: 999;
		inset: 0;
		background: var(--cosmoz-side-drawer-layout-backdrop-color, rgba(0, 0, 0, 0.3));
		transition: display 0.2s allow-discrete, opacity 0.2s;
		display: none;
		opacity: 0;
	}

	:host([left-drawer-open]) .click-layer,
	:host([right-drawer-open]) .click-layer {
		display: block;
		opacity: 1;
	}

	:host([left-drawer-open]) .click-layer,
	:host([right-drawer-open]) .click-layer {
		display: block;
		opacity: 1;
	}

	@starting-style {
		:host([left-drawer-open]) .click-layer,
		:host([right-drawer-open]) .click-layer {
			opacity: 0;
		}
	}
	}

	.main-wrapper {
		display: flex;
		flex: 1 1 auto;
		overflow: hidden auto;
		position: relative;
	}
	.main-wrapper::-webkit-scrollbar {
		width: 4px;
	}
	.main-wrapper::-webkit-scrollbar-track {
		background: transparent;
		cursor: pointer;
	}
	.main-wrapper::-webkit-scrollbar-thumb,
	.main-wrapper::-webkit-scrollbar-thumb:hover {
		background: var(--cosmoz-omnitable-mini-scrollbar-thumb-bg, #aaa);
		cursor: pointer;
	}
	:host {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 0;

		contain: paint;
		container-type: inline-size;

		--right-drawer-width: var(
			--cosmoz-side-drawer-layout-right-drawer-width,
			min(400px, 100cqw)
		);
		--right-drawer-current-width: 0px;
		--left-drawer-width: var(
			--cosmoz-side-drawer-layout-left-drawer-width,
			min(400px, 100cqw)
		);
		--left-drawer-current-width: 0px;

		margin: 0 auto;
	}

	:host([left-drawer-open]) {
		--left-drawer-current-width: var(--left-drawer-width);
		--cosmoz-side-drawer-layout-gap: 5px;
	}

	:host([right-drawer-open]) {
		--right-drawer-current-width: var(--right-drawer-width);
		--cosmoz-side-drawer-layout-gap: 5px;
	}

	.wrapper {
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		gap: var(--cosmoz-side-drawer-layout-gap, 0);
		--drawer-mode: overlay;
	}

	.side {
		position: fixed;
		display: block;
		flex: 0 1 auto;
		flex: none;
		min-width: 0;
		height: 100%;
		transition: width 0.2s ease-in-out;
		contain: paint;
		box-shadow:
			-6px 0px 16px rgba(16, 24, 40, 0.06),
			-1px 0px 8px rgba(16, 24, 40, 0.1);
		max-width: 100cqw;
		box-sizing: border-box;
		background: var(--primary-background-color, #fff);
		z-index: 1000;
	}

	.left {
		left: 0;
		width: var(--left-drawer-current-width, 0);
	}

	.right {
		right: 0;
		width: var(--right-drawer-current-width, 0);
	}

	.main {
		display: flex;
		flex: 1 1 auto;
	}

	::slotted([slot='left-drawer']) {
		width: var(--left-drawer-width);
	}

	::slotted([slot='right-drawer']) {
		width: var(--right-drawer-width);
	}
`,customElements.define(`cosmoz-side-drawer-layout`,s(h,{styleSheets:[g],observedAttributes:[`left-breakpoint`,`right-breakpoint`]}))})),v,y,b,x,S,C,w,T;e((()=>{a(),_(),c(),v={title:`SideDrawerLayout`,component:`cosmoz-side-drawer-layout`,tags:[`autodocs`],argTypes:{leftBreakpoint:{control:`number`,description:`Width breakpoint (px) for left drawer side/overlay switch. 0 = always side mode.`},rightBreakpoint:{control:`number`,description:`Width breakpoint (px) for right drawer side/overlay switch. 0 = always side mode.`},leftDrawerOpen:{control:`boolean`,description:`Opens the left drawer (overlay mode)`},rightDrawerOpen:{control:`boolean`,description:`Opens the right drawer (overlay mode)`}},args:{leftBreakpoint:1024,rightBreakpoint:1024,leftDrawerOpen:!1,rightDrawerOpen:!1}},y={render:e=>t`
            <cosmoz-side-drawer-layout
                left-breakpoint=${e.leftBreakpoint}
                right-breakpoint=${e.rightBreakpoint}
                ?left-drawer-open=${e.leftDrawerOpen}
                ?right-drawer-open=${e.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <cosmoz-side-panel slot="left-drawer">
                    <div style="padding: 16px;">Left Drawer Content</div>
                </cosmoz-side-panel>
                <div style="padding: 16px;">Main Content Area</div>
                <cosmoz-side-panel slot="right-drawer">
                    <div style="padding: 16px;">Right Drawer Content</div>
                </cosmoz-side-panel>
            </cosmoz-side-drawer-layout>
        `},b={args:{leftBreakpoint:1600,rightBreakpoint:1600,leftDrawerOpen:!1,rightDrawerOpen:!0},render:e=>t`
            <cosmoz-side-drawer-layout
                left-breakpoint=${e.leftBreakpoint}
                right-breakpoint=${e.rightBreakpoint}
                ?left-drawer-open=${e.leftDrawerOpen}
                ?right-drawer-open=${e.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <div style="padding: 16px;">Main Content Area</div>
                <cosmoz-side-panel slot="right-drawer">
                    <div style="padding: 16px;">Right Drawer Content</div>
                </cosmoz-side-panel>
            </cosmoz-side-drawer-layout>
        `},x={args:{leftBreakpoint:1600,rightBreakpoint:1600,leftDrawerOpen:!0,rightDrawerOpen:!1},render:e=>t`
            <cosmoz-side-drawer-layout
                left-breakpoint=${e.leftBreakpoint}
                right-breakpoint=${e.rightBreakpoint}
                ?left-drawer-open=${e.leftDrawerOpen}
                ?right-drawer-open=${e.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <cosmoz-side-panel slot="left-drawer">
                    <div style="padding: 16px;">Left Drawer Content</div>
                </cosmoz-side-panel>
                <div style="padding: 16px;">Main Content Area</div>
            </cosmoz-side-drawer-layout>
        `},S={args:{leftBreakpoint:1600,rightBreakpoint:1600,leftDrawerOpen:!0,rightDrawerOpen:!0},render:e=>t`
            <cosmoz-side-drawer-layout
                left-breakpoint=${e.leftBreakpoint}
                right-breakpoint=${e.rightBreakpoint}
                ?left-drawer-open=${e.leftDrawerOpen}
                ?right-drawer-open=${e.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <cosmoz-side-panel slot="left-drawer">
                    <div style="padding: 16px;">Left Drawer Content</div>
                </cosmoz-side-panel>
                <div style="padding: 16px;">Main Content Area</div>
                <cosmoz-side-panel slot="right-drawer">
                    <div style="padding: 16px;">Right Drawer Content</div>
                </cosmoz-side-panel>
            </cosmoz-side-drawer-layout>
        `},C={args:{leftBreakpoint:0,rightBreakpoint:1024,leftDrawerOpen:!1,rightDrawerOpen:!1},render:e=>t`
            <cosmoz-side-drawer-layout
                left-breakpoint=${e.leftBreakpoint}
                right-breakpoint=${e.rightBreakpoint}
                ?left-drawer-open=${e.leftDrawerOpen}
                ?right-drawer-open=${e.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <cosmoz-side-panel slot="left-drawer">
                    <div style="padding: 16px;">Left Drawer (always side)</div>
                </cosmoz-side-panel>
                <div style="padding: 16px;">Main Content Area</div>
                <cosmoz-side-panel slot="right-drawer">
                    <div style="padding: 16px;">Right Drawer (overlay)</div>
                </cosmoz-side-panel>
            </cosmoz-side-drawer-layout>
        `},w={args:{leftBreakpoint:600,rightBreakpoint:1200,leftDrawerOpen:!1,rightDrawerOpen:!1},render:e=>t`
            <cosmoz-side-drawer-layout
                left-breakpoint=${e.leftBreakpoint}
                right-breakpoint=${e.rightBreakpoint}
                ?left-drawer-open=${e.leftDrawerOpen}
                ?right-drawer-open=${e.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <cosmoz-side-panel slot="left-drawer">
                    <div style="padding: 16px;">Left Drawer (breakpoint: ${e.leftBreakpoint})</div>
                </cosmoz-side-panel>
                <div style="padding: 16px;">Main Content Area</div>
                <cosmoz-side-panel slot="right-drawer">
                    <div style="padding: 16px;">Right Drawer (breakpoint: ${e.rightBreakpoint})</div>
                </cosmoz-side-panel>
            </cosmoz-side-drawer-layout>
        `},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => html\`
            <cosmoz-side-drawer-layout
                left-breakpoint=\${args.leftBreakpoint}
                right-breakpoint=\${args.rightBreakpoint}
                ?left-drawer-open=\${args.leftDrawerOpen}
                ?right-drawer-open=\${args.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <cosmoz-side-panel slot="left-drawer">
                    <div style="padding: 16px;">Left Drawer Content</div>
                </cosmoz-side-panel>
                <div style="padding: 16px;">Main Content Area</div>
                <cosmoz-side-panel slot="right-drawer">
                    <div style="padding: 16px;">Right Drawer Content</div>
                </cosmoz-side-panel>
            </cosmoz-side-drawer-layout>
        \`
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    leftBreakpoint: 1600,
    rightBreakpoint: 1600,
    leftDrawerOpen: false,
    rightDrawerOpen: true
  },
  render: args => html\`
            <cosmoz-side-drawer-layout
                left-breakpoint=\${args.leftBreakpoint}
                right-breakpoint=\${args.rightBreakpoint}
                ?left-drawer-open=\${args.leftDrawerOpen}
                ?right-drawer-open=\${args.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <div style="padding: 16px;">Main Content Area</div>
                <cosmoz-side-panel slot="right-drawer">
                    <div style="padding: 16px;">Right Drawer Content</div>
                </cosmoz-side-panel>
            </cosmoz-side-drawer-layout>
        \`
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    leftBreakpoint: 1600,
    rightBreakpoint: 1600,
    leftDrawerOpen: true,
    rightDrawerOpen: false
  },
  render: args => html\`
            <cosmoz-side-drawer-layout
                left-breakpoint=\${args.leftBreakpoint}
                right-breakpoint=\${args.rightBreakpoint}
                ?left-drawer-open=\${args.leftDrawerOpen}
                ?right-drawer-open=\${args.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <cosmoz-side-panel slot="left-drawer">
                    <div style="padding: 16px;">Left Drawer Content</div>
                </cosmoz-side-panel>
                <div style="padding: 16px;">Main Content Area</div>
            </cosmoz-side-drawer-layout>
        \`
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    leftBreakpoint: 1600,
    rightBreakpoint: 1600,
    leftDrawerOpen: true,
    rightDrawerOpen: true
  },
  render: args => html\`
            <cosmoz-side-drawer-layout
                left-breakpoint=\${args.leftBreakpoint}
                right-breakpoint=\${args.rightBreakpoint}
                ?left-drawer-open=\${args.leftDrawerOpen}
                ?right-drawer-open=\${args.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <cosmoz-side-panel slot="left-drawer">
                    <div style="padding: 16px;">Left Drawer Content</div>
                </cosmoz-side-panel>
                <div style="padding: 16px;">Main Content Area</div>
                <cosmoz-side-panel slot="right-drawer">
                    <div style="padding: 16px;">Right Drawer Content</div>
                </cosmoz-side-panel>
            </cosmoz-side-drawer-layout>
        \`
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    leftBreakpoint: 0,
    rightBreakpoint: 1024,
    leftDrawerOpen: false,
    rightDrawerOpen: false
  },
  render: args => html\`
            <cosmoz-side-drawer-layout
                left-breakpoint=\${args.leftBreakpoint}
                right-breakpoint=\${args.rightBreakpoint}
                ?left-drawer-open=\${args.leftDrawerOpen}
                ?right-drawer-open=\${args.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <cosmoz-side-panel slot="left-drawer">
                    <div style="padding: 16px;">Left Drawer (always side)</div>
                </cosmoz-side-panel>
                <div style="padding: 16px;">Main Content Area</div>
                <cosmoz-side-panel slot="right-drawer">
                    <div style="padding: 16px;">Right Drawer (overlay)</div>
                </cosmoz-side-panel>
            </cosmoz-side-drawer-layout>
        \`
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    leftBreakpoint: 600,
    rightBreakpoint: 1200,
    leftDrawerOpen: false,
    rightDrawerOpen: false
  },
  render: args => html\`
            <cosmoz-side-drawer-layout
                left-breakpoint=\${args.leftBreakpoint}
                right-breakpoint=\${args.rightBreakpoint}
                ?left-drawer-open=\${args.leftDrawerOpen}
                ?right-drawer-open=\${args.rightDrawerOpen}
                style="height: 400px; border: 1px solid #ddd;"
            >
                <cosmoz-side-panel slot="left-drawer">
                    <div style="padding: 16px;">Left Drawer (breakpoint: \${args.leftBreakpoint})</div>
                </cosmoz-side-panel>
                <div style="padding: 16px;">Main Content Area</div>
                <cosmoz-side-panel slot="right-drawer">
                    <div style="padding: 16px;">Right Drawer (breakpoint: \${args.rightBreakpoint})</div>
                </cosmoz-side-panel>
            </cosmoz-side-drawer-layout>
        \`
}`,...w.parameters?.docs?.source}}},T=[`Default`,`RightDrawerOpen`,`LeftDrawerOpen`,`BothDrawersOpen`,`AlwaysSideModeLeft`,`DifferentBreakpoints`]}))();export{C as AlwaysSideModeLeft,S as BothDrawersOpen,y as Default,w as DifferentBreakpoints,x as LeftDrawerOpen,b as RightDrawerOpen,T as __namedExportsOrder,v as default};