import block from 'bem-css-modules';

type TCssModule =
    | {
          [key: string]: string;
      }
    | {
          readonly [key: string]: string;
      };

export const cn = (name: string, module: TCssModule) => block(module, name);
