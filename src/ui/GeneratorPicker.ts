// UI component that lets the user pick and configure a generator
import m from 'mithril';
import type { GeneratorRegistry, GeneratorConfig, GeneratorName } from '../geometry/generators/Generator';
import BooleanInputControl from './inputs/BooleanInputControl';
import ChoiceInputControl from './inputs/ChoiceInputControl';
import NumberInputControl from './inputs/NumberInputControl';
import RangeInputControl from './inputs/RangeInputControl';
import StringInputControl from './inputs/StringInputControl';

// Webawesome components
import '@awesome.me/webawesome/dist/components/tab/tab.js';
import '@awesome.me/webawesome/dist/components/tab-group/tab-group.js';
import '@awesome.me/webawesome/dist/components/tab-panel/tab-panel.js';
import type { WaTabShowEvent } from '@awesome.me/webawesome';


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

    view: ({ attrs }) => {

      const generators = attrs.registry.getAvailableGenerators();

      return m(".generator-picker",
        m('wa-tab-group', {
          active: attrs.generator,
          // custom Webawesome event triggered when a new tab panel is shown
          'onwa-tab-show': (e: WaTabShowEvent) => {
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
            const tab = m('wa-tab', { panel: generator.name }, generator.displayName);

            // matching panel contains controls specific to that generator
            const panel = m('wa-tab-panel', { name: generator.name }, m('.controls',
              [
                // detailed description of the generator if available
                uiMetadata?.description ? m('p', uiMetadata.description) : null,

                // UI controls defined by the generator
                ...uiMetadata?.controls.map((control) => {
                  switch(control.type) {
                  case "range":
                    return m(RangeInputControl, {
                      config: control,
                      value: (attrs.config?.[control.name] ?? control.defaultValue) as number | undefined,
                      onChange: (value) => {
                        attrs.onConfigChange(control.name, value);
                      },
                    });
                  case "boolean":
                    return m(BooleanInputControl, {
                      config: control,
                      value: (attrs.config?.[control.name] ?? control.defaultValue) === true,
                      onChange: (value) => {
                        attrs.onConfigChange(control.name, value);
                      },
                    });
                  case "number":
                    return m(NumberInputControl, {
                      config: control,
                      value: (attrs.config?.[control.name] ?? control.defaultValue) as number | undefined,
                      onChange: (value) => {
                        attrs.onConfigChange(control.name, value);
                      },
                    });
                  case "string":
                    return m(StringInputControl, {
                      config: control,
                      value: (attrs.config?.[control.name] ?? control.defaultValue) as string | undefined,
                      onChange: (value) => {
                        attrs.onConfigChange(control.name, value);
                      },
                    });
                  case "choice":
                    return m(ChoiceInputControl, {
                      config: control,
                      value: (attrs.config?.[control.name] ?? control.defaultValue) as string | undefined,
                      onChange: (value) => {
                        attrs.onConfigChange(control.name, value);
                      },
                    });
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
