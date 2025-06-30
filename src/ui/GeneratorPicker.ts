// UI component that lets the user pick and configure a generator
import m from 'mithril';
import type { GeneratorRegistry, GeneratorConfig, GeneratorName } from '../geometry/generators/Generator';

// Shoelace components
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import SlTabGroup from'@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';

// unfortunately, Shoelace doesn't export this type
type SlTabShowEvent = CustomEvent<{ name: string }>;


// include our CSS
import './GeneratorPicker.css';

// component attributes
export interface GeneratorPickerAttrs<C extends GeneratorConfig = GeneratorConfig> extends m.Attributes {
  /** Currently selected generator for this type */
  generator: GeneratorName;
  /** All the registered generators for this type */
  registry: GeneratorRegistry<unknown>;
  /** Current configuration for the selected generator */
  config: C;
  /** Called when the selected generator changes */
  onGeneratorChange: (generatorName: string) => void;
  /** Called when any config value changes */
  onConfigChange: <K extends keyof C>(key: K, value: C[K]) => void;
}

// component
export const GeneratorPicker: m.ClosureComponent<GeneratorPickerAttrs> = () => {

  // no component state

  // component
  return {
    oncreate: ({ dom, attrs }) => {
      const tabGroup = dom.querySelector('sl-tab-group') as SlTabGroup;
      tabGroup.show(attrs.generator);
    },

    onupdate: ({ dom, attrs }) => {
      const tabGroup = dom.querySelector('sl-tab-group') as SlTabGroup;
      tabGroup.show(attrs.generator);
    },

    view: ({ attrs }) => {

      const generators = attrs.registry.getAvailableGenerators();

      return m(".generator-picker",
        m('sl-tab-group', {
          // custom Shoelace event triggered when a new tab panel is shown
          'onsl-tab-show': (e: SlTabShowEvent) => {
            const newSelected = e.detail.name;
            if (attrs.generator !== newSelected) {
              attrs.onGeneratorChange(newSelected);
            }
          },
        }, [
          ...generators.map((generator) => {
            // get the UI metadata associated with this generator
            const uiMetadata = attrs.registry.getUIMetadata(generator.name);

            // tab contains name of generator
            const tab = m('sl-tab', {
              slot: "nav",
              panel: generator.name,
            }, generator.displayName);

            // matching panel contains controls specific to that generator
            const panel = m('sl-tab-panel', {
              name: generator.name,
            }, m('.controls',
              [
                // detailed description of the generator if available
                uiMetadata?.description ? m('p', uiMetadata.description) : null,

                // UI controls defined by the generator
                ...uiMetadata?.controls.map((control) => {
                  switch(control.type) {
                  case "range":
                    return m("label", [
                      `${control.label}: `,
                      m("input[type=range]", {
                        min: control.min,
                        max: control.max,
                        value: attrs.config?.[control.name] ?? control.defaultValue,
                        step: control.step,
                      }),
                    ]);
                  case "boolean":
                    return m("label", [
                      `${control.label}: `,
                      m("input[type=checkbox]", {
                        checked: (attrs.config?.[control.name] ?? control.defaultValue) === true,
                      }),
                    ]);
                  case "number":
                    return m("label", [
                      `${control.label}: `,
                      m("input[type=number]", {
                        min: control.min ?? null,
                        max: control.max ?? null,
                        value: attrs.config?.[control.name] ?? control.defaultValue,
                      }),
                    ]);
                  case "string":
                    return m("label", [
                      `${control.label}: `,
                      m("input[type=text]", {
                        value: attrs.config?.[control.name] ?? control.defaultValue,
                      }),
                    ]);
                  }
                }) ?? [],

                // no controls message when appropriate
                (!uiMetadata?.description && uiMetadata?.controls.length == 0) ? m('p', 'No controls for this strategy.') : null,
              ])
            );
            return [tab, panel];
          }),
        ])
      );
    },
  };
};
export default GeneratorPicker;
