const path=require("path")
const fse = require('fs-extra');

const REG_LIBRARY = /^[a-z]+(\-[a-z]+)*$/;

const TEMPLATES_SETTINGS = {
  'js-library': {
    msg: '请输入 New Package 名称（小写字母、中划线连接）：',
    regular: REG_LIBRARY,
    targetDir: path.resolve(__dirname, '../packages'),
    tplDir: path.resolve(__dirname, '../templates/js-library-tpl'),
  },
  'ts-library': {
    msg: '请输入 New Package 名称（小写字母、中划线连接）：',
    regular: REG_LIBRARY,
    targetDir: path.resolve(__dirname, '../packages'),
    tplDir: path.resolve(__dirname, '../templates/ts-library-tpl'),
  },
  'lit-element-library': {
    msg: '请输入 New Package 名称（小写字母、中划线连接）：',
    regular: REG_LIBRARY,
    targetDir: path.resolve(__dirname, '../packages'),
    tplDir: path.resolve(__dirname, '../templates/lit-element-library-tpl'),
  },
};

const askQuestion=
[
    {
      type: 'list',
      message: '请选择packages模板',
      name: 'template',
      choices: [
        { name: '基础 JS 模板', value: 'js-library' },
        { name: '基础 TS 模板', value: 'ts-library' },
        { name: 'lit element 模板', value: 'lit-element-library' },
      ],
      default: 'ts-library',
    },
    {
      type: 'input',
      name: 'name',
      message: ({ template }) => TEMPLATES_SETTINGS[template].msg,
      validate: async (name, { template }) => {
        const setting = TEMPLATES_SETTINGS[template];
        // 判断输入规则
        if (!setting.regular.test(name)) {
          warningLog('\n项目名称格式出错，请重新输入');
          return false;
        }
        const dir = `${setting.targetDir}/${name}`;
        // 不存在自动新建，并返回路径
        const path = await fse.ensureDir(dir);

        console.log("fse path",path)

        if (!path) {
          warningLog('\n已存在同名目录，请检查后重新输入');
          return false;
        }

        return true;
      },
    },
    {
      type: 'input',
      name: 'desc',
      message: '请输入项目描述',
    },
    {
      type: 'input',
      name: 'author',
      message: '请输入 Author（中英文皆可，用于自动添加 Author 标签）：',
      default: 'uesr-->',
    },
  ]

module.exports= askQuestion