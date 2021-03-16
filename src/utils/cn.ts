import block from 'bem-css-modules';

block.setSettings({
    elementDelimiter: '__',
    modifierDelimiter: '_',
});

type TCssModule =
    | {
          [key: string]: string;
      }
    | {
          readonly [key: string]: string;
      };

export const cn = (name: string, module: TCssModule) => block(module, name);
