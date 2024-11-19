import { useMainStore } from '@/store'

const titles: DeepReadonly<Title[]> = [
  // * 路面
  {
    type: '沥青路面压实度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: true,
      },
      {
        name: '路面类型',
        prop: 'lmlx',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '路、桥、隧',
        prop: 'lqs',
        echo: true,
        pickerValue: ['路', '桥', '隧'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '取样位置',
        prop: 'qywz',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '层位',
        prop: 'cw',
        echo: true,
        pickerValue: ['上面层', '中间层', '下面层'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '干燥试件质量',
        prop: 'gzsjzl',
        echo: false,
        rules: {
          notNull: true
        }
      },
      {
        name: '试件水中质量',
        prop: 'sjszzl',
        echo: false,
      },
      {
        name: '时间表干质量',
        prop: 'sjbgzl',
        echo: false,
      },
      {
        name: '实验室标准密度',
        prop: 'sysbzmd',
        echo: true,
      },
      {
        name: '最大理论密度',
        prop: 'zdllmd',
        echo: true,
      },
      {
        name: '实验室标准密度规定值',
        prop: 'sysbzmdgdz',
        echo: true,
      },
      {
        name: '最大理论密度规定值',
        prop: 'zdllmdgdz',
        echo: true,
      },
      {
        name: '是否分离',
        prop: 'sffl',
        echo: true,
        pickerValue: ['是', '否'],
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '路面弯沉贝克曼梁法',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '工程部位',
        prop: 'gcbw',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '验收弯沉值',
        prop: 'yswcz',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '季节影响系数',
        prop: 'jjyxxs',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '结构层次',
        prop: 'jgcc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '结构类型',
        prop: 'jglx',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '目标可靠指标',
        prop: 'mbkkzb',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '湿度影响系数',
        prop: 'sdyxxs',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '材料层厚度',
        prop: 'clchd',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '平衡湿度路基顶面回弹模量',
        prop: 'phsdljdmhtml',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '后轴重',
        prop: 'hzz',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '轮胎气压',
        prop: 'ltqy',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '车道',
        prop: 'cd',
        echo: false,
        pickerValue: ['行1', '行2', '行3', '行4', '行5', '行6', '行7', '行8'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '左值',
        prop: 'zz',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '右值',
        prop: 'yz',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '路表温度',
        prop: 'lbwd',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '备注',
        prop: 'bz',
        echo: false,
      },
      {
        name: '测前5h平均温度',
        prop: 'cqpjwd',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '沥青层总厚度',
        prop: 'lqczhd',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '沥青表面温度',
        prop: 'lqbmwd',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '序号',
        prop: 'xh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '沥青路面渗水系数',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '主线、匝道、隧道',
        prop: 'lxlx',
        echo: true,
        pickerValue: ['主线', '匝道', '隧道'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '初读数',
        prop: 'cds',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '第一分钟读数',
        prop: 'ofzds',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '第二分钟读数',
        prop: 'tfzds',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '水量',
        prop: 'sl',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '时间',
        prop: 'sj',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },

      {
        name: '渗水系数规定值',
        prop: 'ssxsgdz',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '混凝土路面强度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '取样位置名称',
        prop: 'qywzmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '试样平均直径',
        prop: 'sypjzj',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '试样平均厚度',
        prop: 'sypjhd',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '极限荷载',
        prop: 'jxhz',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '路面强度规定值',
        prop: 'lmqdgdz',
        echo: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '砼路面相邻板高差',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '取样位置名称',
        prop: 'qywzmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值1',
        prop: 'scz1',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值2',
        prop: 'scz2',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值3',
        prop: 'scz3',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值4',
        prop: 'scz4',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '板高差规定值',
        prop: 'bgcgdz',
        echo: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '路面构造深度手工铺砂法',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '路面类型',
        prop: 'lmlx',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: 'ABM',
        prop: 'abm',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: 'ZY',
        prop: 'zy',
        echo: true,
        pickerValue: ['z', 'y'],
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '车道',
        prop: 'cd',
        echo: true,
        pickerValue: ['行1', '行2', '行3', '行4', '行5', '行6', '行7', '行8'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计最小值',
        prop: 'sjzxz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计最大值',
        prop: 'sjzdz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点1D1',
        prop: 'cd1d1',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点1D2',
        prop: 'cd1d2',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点2D1',
        prop: 'cd2d1',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点2D2',
        prop: 'cd2d2',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点3D1',
        prop: 'cd3d1',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点3D2',
        prop: 'cd3d2',
        echo: false,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '高速沥青路面厚度钻芯法',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '路、桥、隧、匝道',
        prop: 'lx',
        echo: false,
        pickerValue: ['路', '桥', '隧', '匝道'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '上面层测值1',
        prop: 'smccz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '上面层测值2',
        prop: 'smccz2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '上面层测值3',
        prop: 'smccz3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '上面层测值4',
        prop: 'smccz4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '上面层设计值',
        prop: 'smcsjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '总厚度测值1',
        prop: 'zhdcz1',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '总厚度测值2',
        prop: 'zhdcz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '总厚度测值3',
        prop: 'zhdcz3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '总厚度测值4',
        prop: 'zhdcz4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '总厚度设计值',
        prop: 'zhdsjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '混凝土路面厚度钻芯法',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '路、桥、隧、匝道',
        prop: 'lx',
        echo: false,
        pickerValue: ['路', '桥', '隧', '匝道'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位',
        prop: 'bw',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测值1',
        prop: 'cz1',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测值2',
        prop: 'cz2',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测值3',
        prop: 'cz3',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测值4',
        prop: 'cz4',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许偏差',
        prop: 'yxps',
        echo: true,
        numberOnly: true,
      },
    ],
  },
  {
    type: '路面横坡',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '路面类型',
        prop: 'lmlx',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: 'Z/Y',
        prop: 'zy',
        echo: false,
        pickerValue: ['Z', 'Y','E'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '位置',
        prop: 'wz',
        echo: false,
        pickerValue: ['左幅', '右幅'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '前视读数',
        prop: 'qsds',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '后视读数',
        prop: 'hsds',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '长',
        prop: 'length',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许偏差',
        prop: 'yxps', // ? why ps ? need pc ?
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '路线类型',
        prop: 'lxlx',
        echo: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },

  // * 路基
  {
    type: '涵洞砼强度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位1',
        prop: 'bw1',
        echo: true,
        pickerValue: ['Z0#', 'Y0#', 'Z1#', 'Y1#'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位2',
        prop: 'bw2',
        echo: true,
        pickerValue: ['涵身', '八字墙'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '值1',
        prop: 'z1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值2',
        prop: 'z2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值3',
        prop: 'z3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值4',
        prop: 'z4',
        echo: false,
        numberOnly: true,
      },
      {
        name: '值5',
        prop: 'z5',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值6',
        prop: 'z6',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值7',
        prop: 'z7',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值8',
        prop: 'z8',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值9',
        prop: 'z9',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值10',
        prop: 'z10',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值11',
        prop: 'z11',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值12',
        prop: 'z12',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值13',
        prop: 'z13',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值14',
        prop: 'z14',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值15',
        prop: 'z15',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值16',
        prop: 'z16',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '回弹角度',
        prop: 'htjd',
        echo: true,
        pickerValue: ['90', '60', '45', '30', '-90', '-60', '-45', '-30'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '浇筑面',
        prop: 'jzm',
        echo: true,
        pickerValue: ['表面', '底面', '侧面'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '碳化深度',
        prop: 'thsd',
        echo: true,
        pickerValue: [
          '0.0',
          '0.5',
          '1.0',
          '2.0',
          '2.5',
          '3.0',
          '3.5',
          '4.0',
          '4.5',
          '5.0',
          '5.5',
          '≥6.0',
        ],
		rules: {
		  notNull: true
		}
      },
      {
        name: '是否泵送',
        prop: 'sfbs',
        echo: true,
        pickerValue: ['是', '否'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计强度',
        prop: 'sjqd',
        echo: true,
        pickerValue: [
          'C15',
          'C20',
          'C25',
          'C30',
          'C35',
          'C40',
          'C45',
          'C50',
          'C55',
          'C60',
          'C65',
          'C70',
          'C75',
          'C80',
        ],
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '涵洞结构尺寸',
    columns: [
      {
        name: '检测日期',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位',
        prop: 'bw',
        echo: true,
        pickerValue: ['左侧', '右侧', '0#', '1#'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '类别',
        prop: 'lb',
        echo: true,
        pickerValue: ['涵长', '净高', '盖板高度'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值',
        prop: 'scz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差+(mm)',
        prop: 'yxwcz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差-(mm)',
        prop: 'yxwcf',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '排水断面尺寸',
    columns: [
      {
        name: '检测日期',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位',
        prop: 'bw',
        echo: true,
        pickerValue: ['左侧', '右侧'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '类别',
        prop: 'lb',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值',
        prop: 'scz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差+',
        prop: 'yxwcz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差-',
        prop: 'yxwcf',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '排水铺砌厚度',
    columns: [
      {
        name: '检测日期',
        prop: 'jcsj',
        echo: true,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位',
        prop: 'bw',
        echo: true,
        pickerValue: ['左侧', '右侧'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '类别',
        prop: 'lb',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值',
        prop: 'scz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差',
        prop: 'yxwc',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '路基土石方压实度(灰土)',
    columns: [
      {
        name: '试验时间',
        prop: 'sysj',
        echo: false,
      },
      {
        name: '路基压实度_灰土规定值',
        prop: 'htgdz',
        echo: true,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
      },
      {
        name: '结构层次',
        prop: 'jgcc',
        echo: true,
        pickerValue: ['路床顶'],
      },
      {
        name: '结构类型',
        prop: 'jglx',
        echo: true,
        pickerValue: ['灰土', '水泥土', '砂砾', '建筑垃圾'],
      },
      {
        name: '最大干密度',
        prop: 'zdgmd',
        echo: true,
      },
      {
        name: '标准砂密度',
        prop: 'bzsmd',
        echo: true,
      },
      {
        name: '取样桩号及位置',
        prop: 'qyzhjwz',
        echo: true,
      },
      {
        name: '试坑深度',
        prop: 'sksd',
        echo: true,
      },
      {
        name: '锥体及基板和表面间砂质量',
        prop: 'ztjjbhbmjszl',
        echo: true,
      },
      {
        name: '灌砂前筒+砂质量',
        prop: 'gsqtszl',
        echo: true,
      },
      {
        name: '灌砂后筒+砂质量',
        prop: 'gshtszl',
        echo: true,
      },
      {
        name: '试样质量',
        prop: 'syzl',
        echo: true,
      },
      {
        name: '盒号',
        prop: 'hh',
        echo: false,
      },
      {
        name: '盒质量',
        prop: 'hzl',
        echo: false,
      },
      {
        name: '盒+湿试样质量',
        prop: 'hsshzl',
        echo: false,
      },
      {
        name: '盒+干试样质量',
        prop: 'hgsyzl',
        echo: false,
      },
      {
        name: '序号',
        prop: 'xh',
        echo: false,
      },
    ],
  },
  {
    type: '路基土石方压实度(沙砾)',
    columns: [
      {
        name: '试验时间',
        prop: 'sysj',
      },
      {
        name: '路基压实度_砂砾规定值',
        prop: 'slgdz',
      },
      {
        name: '桩号',
        prop: 'zh',
      },
      {
        name: 'a',
        prop: 'a',
      },
      {
        name: 'b',
        prop: 'b',
      },
      {
        name: 'c',
        prop: 'c',
      },
      {
        name: '取样桩号及位置',
        prop: 'qyzhjwz',
      },
      {
        name: '试坑深度',
        prop: 'sksd',
      },
      {
        name: '灌砂前筒+砂质量',
        prop: 'gsqtszl',
      },
      {
        name: '灌砂后筒+砂质量',
        prop: 'gshtszl',
      },
      {
        name: '锥体砂重',
        prop: 'ztsz',
      },
      {
        name: '量砂的密度',
        prop: 'lsdmd',
      },
      {
        name: '混合料的湿质量',
        prop: 'hhldszl',
      },
      {
        name: '盒号',
        prop: 'hh',
      },
      {
        name: '盒+干质量',
        prop: 'hgzl',
      },
      {
        name: '盒质量',
        prop: 'hzl',
      },
      {
        name: '5-38mm颗粒质量',
        prop: 'klzl',
      },
      {
        name: '序号',
        prop: 'xh',
      }
    ]
  },
  {
    type: '路基压实度沉降',
    columns: [
      {
        name: '检测日期',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许偏差',
        prop: 'yxps',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '检查桩号',
        prop: 'jczh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '碾压读数1',
        prop: 'nyds1',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '碾压读数2',
        prop: 'nyds2',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '备注',
        prop: 'bz',
        echo: false,
      },
      {
        name: '序号',
        prop: 'xh',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '路基弯沉贝克曼梁法',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '验收弯沉值',
        prop: 'yswcz',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '目标可靠指标',
        prop: 'mbkkzb',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '温度影响系数',
        prop: 'sdyxxs', // ? sd or wd ?
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '季节影响系数',
        prop: 'jjyxxs',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '结构层次',
        prop: 'jgcc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '结构类型',
        prop: 'jglx',
        echo: true,
        pickerValue: ['灰土', '水泥土', '砂砾', '建筑垃圾'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '后轴重',
        prop: 'hzz',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '轮胎气压',
        prop: 'ltqy',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '抽检桩号',
        prop: 'cjzh',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '车道',
        prop: 'cd',
        echo: false,
        pickerValue: ['行1', '行2', '行3', '行4', '行5', '行6', '行7', '行8'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '左值',
        prop: 'zz',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '右值',
        prop: 'yz',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '路表温度',
        prop: 'lbwd',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '备注',
        prop: 'bz',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '序号',
        prop: 'xh',
        echo: false,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '路基边坡',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
      },
      {
        name: '位置',
        prop: 'wz',
        echo: true,
        pickerValue: ['左侧', '右侧'],
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '长',
        prop: 'length',
        echo: false,
      },
      {
        name: '高',
        prop: 'high',
        echo: false,
      },
    ],
  },
  {
    type: '小桥结构尺寸',
    columns: [
      {
        name: '检测时间', // ? sj or rq ?
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位',
        prop: 'bw',
        echo: true,
        pickerValue: ['中心线', '桥台', '腹板'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '类别',
        prop: 'lb',
        echo: true,
        pickerValue: ['桥长', '台宽', '台帽高', '板高'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值',
        prop: 'scz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差+',
        prop: 'yxwcz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差-',
        prop: 'yxwcf',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '小桥砼强度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位1',
        prop: 'bw1',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位2',
        prop: 'bw2',
        echo: true,
        pickerValue: ['底板', '台身'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '测定值1',
        prop: 'cdz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值2',
        prop: 'z2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值3',
        prop: 'z3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值4',
        prop: 'z4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值5',
        prop: 'z5',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值6',
        prop: 'z6',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值7',
        prop: 'z7',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值8',
        prop: 'z8',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值9',
        prop: 'z9',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值10',
        prop: 'z10',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值11',
        prop: 'z11',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值12',
        prop: 'z12',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值13',
        prop: 'z13',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值14',
        prop: 'z14',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值15',
        prop: 'z15',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值16',
        prop: 'z16',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '回弹角度',
        prop: 'htjd',
        echo: true,
        pickerValue: ['90', '60', '45', '30', '-90', '-60', '-45', '-30'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '浇筑面',
        prop: 'jzm',
        echo: true,
        pickerValue: ['表面', '底面', '侧面'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '碳化深度',
        prop: 'thsd',
        echo: true,
        pickerValue: [
          '0.0',
          '0.5',
          '1.0',
          '2.0',
          '2.5',
          '3.0',
          '3.5',
          '4.0',
          '4.5',
          '5.0',
          '5.5',
          '≥6.0',
        ],
		rules: {
		  notNull: true
		}
      },
      {
        name: '是否泵送',
        prop: 'sfbs',
        echo: true,
        pickerValue: ['是', '否'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计强度',
        prop: 'sjqd',
        echo: true,
        pickerValue: [
          'C15',
          'C20',
          'C25',
          'C30',
          'C35',
          'C40',
          'C45',
          'C50',
          'C55',
          'C60',
          'C65',
          'C70',
          'C75',
          'C80',
        ],
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '支挡断面尺寸',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桩号及位置',
        prop: 'zhjwz',
        echo: true,
      },
      {
        name: '抽检桩号',
        prop: 'cjzh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位',
        prop: 'bw',
        echo: true,
        pickerValue: [
          '抗滑桩',
          '拱形骨架梁',
          '窗孔式护面墙',
          '挡土墙',
          '护面墙',
          '路堑墙',
          '路肩墙',
        ],
		rules: {
		  notNull: true
		}
      },
      {
        name: '类别',
        prop: 'lb',
        echo: true,
        pickerValue: [
          '长',
          '宽',
          '护坡梁宽',
          '拱形窗净宽',
          '窗孔式净宽',
          '厚度',
        ],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值',
        prop: 'scz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差+',
        prop: 'yxwcz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差-',
        prop: 'yxwcf',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '支挡砼强度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位1',
        prop: 'bw1',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位2',
        prop: 'bw2',
        echo: true,
        pickerValue: ['拱架', '框架', '墙身'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '测定值1',
        prop: 'cdz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值2',
        prop: 'z2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值3',
        prop: 'z3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值4',
        prop: 'z4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值5',
        prop: 'z5',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值6',
        prop: 'z6',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值7',
        prop: 'z7',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值8',
        prop: 'z8',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值9',
        prop: 'z9',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值10',
        prop: 'z10',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值11',
        prop: 'z11',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值12',
        prop: 'z12',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值13',
        prop: 'z13',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值14',
        prop: 'z14',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值15',
        prop: 'z15',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值16',
        prop: 'z16',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '回弹角度',
        prop: 'htjd',
        echo: true,
        pickerValue: ['90', '60', '45', '30', '-90', '-60', '-45', '-30'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '浇筑面',
        prop: 'jzm',
        echo: true,
        pickerValue: ['表面', '底面', '侧面'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '碳化深度',
        prop: 'thsd',
        echo: true,
        pickerValue: [
          '0.0',
          '0.5',
          '1.0',
          '2.0',
          '2.5',
          '3.0',
          '3.5',
          '4.0',
          '4.5',
          '5.0',
          '5.5',
          '≥6.0',
        ],
		rules: {
		  notNull: true
		}
      },
      {
        name: '是否泵送',
        prop: 'sfbs',
        echo: true,
        pickerValue: ['是', '否'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计强度',
        prop: 'sjqd',
        echo: true,
        pickerValue: [
          'C15',
          'C20',
          'C25',
          'C30',
          'C35',
          'C40',
          'C45',
          'C50',
          'C55',
          'C60',
          'C65',
          'C70',
          'C75',
          'C80',
        ],
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '支挡表面平整度',
    columns: [],
  },

  // * 桥梁
  {
    type: '桥面平整度三米直尺法',
    columns: [
      {
        name: '检测日期', // ? rq or sj ?
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桥名',
        prop: 'qm',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '位置',
        prop: 'wz',
        echo: true,
        pickerValue: ['左侧', '右侧'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值',
        prop: 'scz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      // ? there is 'lmlx' in the database
      // ? but why it can't be shown at the frontend?
      // ? should it be necessary?
    ],
  },
  {
    type: '桥面横坡',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桥梁名称',
        prop: 'qlmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '路面类型',
        prop: 'lmlx',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '位置',
        prop: 'wz',
        echo: true,
        pickerValue: ['左幅', '右幅'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '前视读数',
        prop: 'qsds',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '后视读数',
        prop: 'hsds',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '长',
        prop: 'length',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许偏差',
        prop: 'yxps',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '桥面构造深度手工铺砂法',
    columns: [
      {
        name: '检测日期',
        prop: 'jcsj',
        echo: true,
      },
      {
        name: '桥梁名称',
        prop: 'qlmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '路面类型', // ? lmlx or jgmc ?
        prop: 'jgmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: 'ABM',
        prop: 'abm',
        echo: true,
      },
      {
        name: 'ZY',
        prop: 'zy',
        echo: true,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '车道',
        prop: 'cd',
        echo: true,
        pickerValue: ['行1', '行2', '行3', '行4', '行5', '行6', '行7', '行8'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计最小值',
        prop: 'sjzxz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计最大值',
        prop: 'sjzdz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点1D1',
        prop: 'cd1d1',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点1D2',
        prop: 'cd1d2',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点2D1',
        prop: 'cd2d1',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点2D2',
        prop: 'cd2d2',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点3D1',
        prop: 'cd3d1',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点3D2',
        prop: 'cd3d2',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '桥梁上部砼强度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桥梁名称',
        prop: 'qlmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位1',
        prop: 'bw1',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位2',
        prop: 'bw2',
        echo: true,
        pickerValue: ['梁腹板', '梁底板'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '测定值1',
        prop: 'cdz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值2',
        prop: 'z2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值3',
        prop: 'z3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值4',
        prop: 'z4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值5',
        prop: 'z5',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值6',
        prop: 'z6',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值7',
        prop: 'z7',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值8',
        prop: 'z8',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值9',
        prop: 'z9',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值10',
        prop: 'z10',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值11',
        prop: 'z11',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值12',
        prop: 'z12',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值13',
        prop: 'z13',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值14',
        prop: 'z14',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值15',
        prop: 'z15',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值16',
        prop: 'z16',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '回弹角度',
        prop: 'htjd',
        echo: true,
        pickerValue: ['90', '60', '45', '30', '-90', '-60', '-45', '-30'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '浇筑面',
        prop: 'jzm',
        echo: true,
        pickerValue: ['表面', '底面', '侧面'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '碳化深度',
        prop: 'thsd',
        echo: true,
        pickerValue: [
          '0.0',
          '0.5',
          '1.0',
          '2.0',
          '2.5',
          '3.0',
          '3.5',
          '4.0',
          '4.5',
          '5.0',
          '5.5',
          '≥6.0',
        ],
		rules: {
		  notNull: true
		}
      },
      {
        name: '是否泵送',
        prop: 'sfbs',
        echo: true,
        pickerValue: ['是', '否'],
      },
      {
        name: '设计强度',
        prop: 'sjqd',
        echo: true,
        pickerValue: [
          'C15',
          'C20',
          'C25',
          'C30',
          'C35',
          'C40',
          'C45',
          'C50',
          'C55',
          'C60',
          'C65',
          'C70',
          'C75',
          'C80',
        ],
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '桥梁上部结构尺寸',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桥梁名称',
        prop: 'qlmc',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位',
        prop: 'bw',
        echo: true,
        pickerValue: ['梁底板', '梁腹板'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '类别',
        prop: 'lb',
        echo: true,
        pickerValue: ['高度', '宽度'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '梁板号',
        prop: 'lbh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值',
        prop: 'scz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差+', // ? wc or pc ?
        prop: 'yxwcz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差-',
        prop: 'yxwcf',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '桥梁上部保护层厚度',
    columns: [
      {
        name: '检测日期',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桥梁名称',
        prop: 'qlmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '构件编号及检测部位',
        prop: 'gjbhjjcbw',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '钢筋直径',
        prop: 'gjzj',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值1',
        prop: 'scz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值2',
        prop: 'scz2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值3',
        prop: 'scz3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值4',
        prop: 'scz4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值5',
        prop: 'scz5',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值6',
        prop: 'scz6',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '修正值',
        prop: 'xzz',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差+',
        prop: 'yxwcz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差-',
        prop: 'yxwcz1',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '桥梁下部墩台砼强度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桥梁名称',
        prop: 'qlmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位1',
        prop: 'bw1',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位2',
        prop: 'bw2',
        echo: true,
        pickerValue: ['墩柱', '桥台', '盖梁'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '测定值1',
        prop: 'cdz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值2',
        prop: 'z2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值3',
        prop: 'z3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值4',
        prop: 'z4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值5',
        prop: 'z5',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值6',
        prop: 'z6',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值7',
        prop: 'z7',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值8',
        prop: 'z8',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值9',
        prop: 'z9',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值10',
        prop: 'z10',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值11',
        prop: 'z11',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值12',
        prop: 'z12',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值13',
        prop: 'z13',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值14',
        prop: 'z14',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值15',
        prop: 'z15',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值16',
        prop: 'z16',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '回弹角度',
        prop: 'htjd',
        echo: true,
        pickerValue: ['90', '60', '45', '30', '-90', '-60', '-45', '-30'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '浇筑面',
        prop: 'jzm',
        echo: true,
        pickerValue: ['表面', '底面', '侧面'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '碳化深度',
        prop: 'thsd',
        echo: true,
        pickerValue: ['90', '60', '45', '30', '-90', '-60', '-45', '-30'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '是否泵送',
        prop: 'sfbs',
        echo: true,
        pickerValue: ['是', '否'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计强度',
        prop: 'sjqd',
        echo: true,
        pickerValue: [
          'C15',
          'C20',
          'C25',
          'C30',
          'C35',
          'C40',
          'C45',
          'C50',
          'C55',
          'C60',
          'C65',
          'C70',
          'C75',
          'C80',
        ],
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '桥梁下部结构尺寸',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桥梁名称',
        prop: 'qlmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位',
        prop: 'bw',
        echo: true,
        pickerValue: ['墩柱', '桥台', '盖梁'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '类别',
        prop: 'lb',
        echo: true,
        pickerValue: ['直径', '长', '宽', '上宽'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '墩台号',
        prop: 'dth',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值',
        prop: 'scz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差+',
        prop: 'yxwcz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差-',
        prop: 'yxwcf',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '桥梁下部保护层厚度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桥梁名称',
        prop: 'qlmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '构件编号及检测部位',
        prop: 'gjbhjjcbw',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '钢筋直径',
        prop: 'gjzj',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值1',
        prop: 'scz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值2',
        prop: 'scz2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值3',
        prop: 'scz3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值4',
        prop: 'scz4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值5',
        prop: 'scz5',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值6',
        prop: 'scz6',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '修正值',
        prop: 'xzz',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差+',
        prop: 'yxwcz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许误差-',
        prop: 'yxwcf',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '桥梁下部竖直度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桥梁名称',
        prop: 'qlmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '墩台号',
        prop: 'dth',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '墩柱高度',
        prop: 'dzgd',
        echo: true,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '横向实测值',
        prop: 'hxscz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '纵向实测值',
        prop: 'zxscz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },

  // * 交安
  {
    type: '交安标线',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '标线类型',
        prop: 'bxlx',
        echo: true,
        pickerValue: [
          '溶剂型涂料标线',
          '热熔型涂料标线',
          '水性涂料标线',
          '双组分涂料标线',
          '预成型标线带标线',
        ],
		rules: {
		  notNull: true
		}
      },
      {
        name: '位置',
        prop: 'wz',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '厚度规定值',
        prop: 'hdgdz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '厚度允许偏差+',
        prop: 'hdyxpsz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '厚度允许偏差-',
        prop: 'hdyxpsf',
        echo: true,
        numberOnly: true,
      },
      {
        name: '厚度实测值1',
        prop: 'hdscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '厚度实测值2',
        prop: 'hdscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '厚度实测值3',
        prop: 'hdscz3',
        echo: false,
        numberOnly: true,
      },
      {
        name: '厚度实测值4',
        prop: 'hdscz4',
        echo: false,
        numberOnly: true,
      },
      {
        name: '厚度实测值5',
        prop: 'hdscz5',
        echo: false,
        numberOnly: true,
      },
      {
        name: '白线逆反射系数规定值',
        prop: 'bxnfsxsgdz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '白线实测值1',
        prop: 'bxscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '白线实测值2',
        prop: 'bxscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '白线实测值3',
        prop: 'bxscz3',
        echo: false,
        numberOnly: true,
      },
      {
        name: '白线实测值4',
        prop: 'bxscz4',
        echo: false,
        numberOnly: true,
      },
      {
        name: '白线实测值5',
        prop: 'bxscz5',
        echo: false,
        numberOnly: true,
      },
      {
        name: '黄线逆反射系数规定值',
        prop: 'hxnfsxsgdz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '黄线实测值1',
        prop: 'hxscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '黄线实测值2',
        prop: 'hxscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '黄线实测值3',
        prop: 'hxscz3',
        echo: false,
        numberOnly: true,
      },
      {
        name: '黄线实测值4',
        prop: 'hxscz4',
        echo: false,
        numberOnly: true,
      },
      {
        name: '黄线实测值5',
        prop: 'hxscz5',
        echo: false,
        numberOnly: true,
      },
    ],
  },
  {
    type: '交安标志',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '位置',
        prop: 'wz',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '立柱类型',
        prop: 'lzlx',
        echo: true,
        pickerValue: ['单悬', '单柱', '双柱', '附着'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '竖直度允许偏差',
        prop: 'szdyxps',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '方向1实测值1',
        prop: 'fx1scz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '方向1实测值2',
        prop: 'fx1scz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '方向2实测值1',
        prop: 'fx2scz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '方向2实测值2',
        prop: 'fx2scz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '净空规定值',
        prop: 'jkgdz',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '净空实测值',
        prop: 'jkscz',
        echo: false,
        numberOnly: true,
      },
      {
        name: '厚度允许偏差',
        prop: 'hdyxps',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '厚度测值1',
        prop: 'hdcz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '厚度测值2',
        prop: 'hdcz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '白色V类允许偏差',
        prop: 'bsvlyxps',
        echo: true,
        numberOnly: true,
      },
      {
        name: '白色V类实测值1',
        prop: 'bsvlscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '白色V类实测值2',
        prop: 'bsvlscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '白色IV类允许偏差',
        prop: 'bswlyxps',
        echo: true,
        numberOnly: true,
      },
      {
        name: '白色IV类实测值1',
        prop: 'bswlscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '白色IV类实测值2',
        prop: 'bswlscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '绿色V类允许偏差',
        prop: 'lsvlyxps',
        echo: true,
        numberOnly: true,
      },
      {
        name: '绿色V类实测值1',
        prop: 'lsvlscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '绿色V类实测值2',
        prop: 'lsvlscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '绿色IV类允许偏差',
        prop: 'lswlyxps',
        echo: true,
        numberOnly: true,
      },
      {
        name: '绿色IV类实测值1',
        prop: 'lswlscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '绿色IV类实测值2',
        prop: 'lswlscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '黄色V类允许偏差',
        prop: 'hsvlyxps',
        echo: true,
        numberOnly: true,
      },
      {
        name: '黄色V类实测值1',
        prop: 'hsvlscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '黄色V类实测值2',
        prop: 'hsvlscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '黄色IV类允许偏差',
        prop: 'hswlyxps',
        echo: true,
        numberOnly: true,
      },
      {
        name: '黄色IV类实测值1',
        prop: 'hswlscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '黄色IV类实测值2',
        prop: 'hswlscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '蓝色V类允许偏差',
        prop: 'lasvlyxps',
        echo: true,
        numberOnly: true,
      },
      {
        name: '蓝色V类实测值1',
        prop: 'lasvlscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '蓝色V类实测值2',
        prop: 'lasvlscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '蓝色IV类允许偏差',
        prop: 'laswlyxps',
        echo: true,
        numberOnly: true,
      },
      {
        name: '蓝色IV类实测值1',
        prop: 'laswlscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '蓝色IV类实测值2',
        prop: 'laswlscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '红色V类允许偏差',
        prop: 'rsvlyxps',
        echo: true,
        numberOnly: true,
      },
      {
        name: '红色V类实测值1',
        prop: 'rsvlscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '红色V类实测值2',
        prop: 'rsvlscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '红色IV类允许偏差',
        prop: 'rswlyxps',
        echo: true,
        numberOnly: true,
      },
      {
        name: '红色IV类实测值1',
        prop: 'rswlscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '红色IV类实测值2',
        prop: 'rswlscz2',
        echo: false,
        numberOnly: true,
      },
    ],
  },
  {
    type: '交安波形防护栏',
    columns: [
      {
        name: '检测日期',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '位置及类型',
        prop: 'wzjlx',
        echo: true,
      },
      {
        name: '基底厚度规定值',
        prop: 'jdhdgdz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '基底厚度实测值1',
        prop: 'jdhdscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '基底厚度实测值2',
        prop: 'jdhdscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '基底厚度实测值3',
        prop: 'jdhdscz3',
        echo: false,
        numberOnly: true,
      },
      {
        name: '立柱壁厚规定值',
        prop: 'lzbhgdz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '立柱壁厚实测值1',
        prop: 'lzbhscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '立柱壁厚实测值2',
        prop: 'lzbhscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '立柱壁厚实测值3',
        prop: 'lzbhscz3',
        echo: false,
        numberOnly: true,
      },
      {
        name: '中心高度规定值',
        prop: 'zxgdgdz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '中心高度允许偏差+',
        prop: 'zxgdyxpsz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '中心高度允许偏差-',
        prop: 'zxgdyxpsf',
        echo: true,
        numberOnly: true,
      },
      {
        name: '中心高度实测值1',
        prop: 'zxgdscz1',
        echo: false,
        numberOnly: true,
      },
      {
        name: '中心高度实测值2',
        prop: 'zxgdscz2',
        echo: false,
        numberOnly: true,
      },
      {
        name: '中心高度实测值3',
        prop: 'zxgdscz3',
        echo: false,
        numberOnly: true,
      },
      {
        name: '埋入深度规定值',
        prop: 'mrsdgdz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '埋入深度实测值',
        prop: 'mrsdscz',
        echo: false,
        numberOnly: true,
      },
    ],
  },
  {
    type: '交安砼护栏强度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '位置',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位1',
        prop: 'bw1',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位2',
        prop: 'bw2',
        echo: true,
        pickerValue: ['护栏'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '测定值1',
        prop: 'cdz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值2',
        prop: 'z2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值3',
        prop: 'z3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值4',
        prop: 'z4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值5',
        prop: 'z5',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值6',
        prop: 'z6',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值7',
        prop: 'z7',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值8',
        prop: 'z8',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值9',
        prop: 'z9',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值10',
        prop: 'z10',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值11',
        prop: 'z11',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值12',
        prop: 'z12',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值13',
        prop: 'z13',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值14',
        prop: 'z14',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值15',
        prop: 'z15',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值16',
        prop: 'z16',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '回弹角度',
        prop: 'htjd',
        echo: true,
        pickerValue: ['90', '60', '45', '30', '-90', '-60', '-45', '-30'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '浇筑面',
        prop: 'jzm',
        echo: true,
        pickerValue: ['表面', '底面', '侧面'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '碳化深度',
        prop: 'thsd',
        echo: true,
        pickerValue: [
          '0.0',
          '0.5',
          '1.0',
          '2.0',
          '2.5',
          '3.0',
          '3.5',
          '4.0',
          '4.5',
          '5.0',
          '5.5',
          '≥6.0',
        ],
		rules: {
		  notNull: true
		}
      },
      {
        name: '是否泵送',
        prop: 'sfbs',
        echo: true,
        pickerValue: ['是', '否'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计强度',
        prop: 'sjqd',
        echo: true,
        pickerValue: [
          'C15',
          'C20',
          'C25',
          'C30',
          'C35',
          'C40',
          'C45',
          'C50',
          'C55',
          'C60',
          'C65',
          'C70',
          'C75',
          'C80',
        ],
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '交安砼护栏断面尺寸',
    columns: [
      {
        name: '检测日期',
        prop: 'jcrq',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位',
        prop: 'bw',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '类别',
        prop: 'lb',
        echo: true,
        pickerValue: ['上宽', '高'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '实测值',
        prop: 'scz',
        echo: false,
        numberOnly: true,
      },
      {
        name: '允许误差+',
        prop: 'yxwcz',
        echo: true,
        numberOnly: true,
      },
      {
        name: '允许误差-',
        prop: 'yxwcf',
        echo: true,
        numberOnly: true,
      },
    ],
  },

  // * 隧道
  {
    type: '隧道衬砌砼强度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位1',
        prop: 'bw1',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位2',
        prop: 'bw2',
        echo: true,
        pickerValue: ['左边墙', '右边墙'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '测定值1',
        prop: 'cdz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值2',
        prop: 'z2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值3',
        prop: 'z3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值4',
        prop: 'z4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值5',
        prop: 'z5',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值6',
        prop: 'z6',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值7',
        prop: 'z7',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值8',
        prop: 'z8',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值9',
        prop: 'z9',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值10',
        prop: 'z10',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值11',
        prop: 'z11',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值12',
        prop: 'z12',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值13',
        prop: 'z13',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值14',
        prop: 'z14',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值15',
        prop: 'z15',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '值16',
        prop: 'z16',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '回弹角度',
        prop: 'htjd',
        echo: true,
        pickerValue: ['90', '60', '45', '30', '-90', '-60', '-45', '-30'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '浇筑面',
        prop: 'jzm',
        echo: true,
        pickerValue: ['表面', '底面', '侧面'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '碳化深度',
        prop: 'thsd',
        echo: true,
        pickerValue: [
          '0.0',
          '0.5',
          '1.0',
          '2.0',
          '2.5',
          '3.0',
          '3.5',
          '4.0',
          '4.5',
          '5.0',
          '5.5',
          '≥6.0',
        ],
		rules: {
		  notNull: true
		}
      },
      {
        name: '是否泵送',
        prop: 'sfbs',
        echo: true,
        pickerValue: ['是', '否'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计强度',
        prop: 'sjqd',
        echo: true,
        pickerValue: [
          'C15',
          'C20',
          'C25',
          'C30',
          'C35',
          'C40',
          'C45',
          'C50',
          'C55',
          'C60',
          'C65',
          'C70',
          'C75',
          'C80',
        ],
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '隧道衬砌厚度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '位置',
        prop: 'wz',
        echo: true,
        pickerValue: ['左幅', '右幅'],
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计厚度',
        prop: 'sjhd',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '左拱腰1',
        prop: 'zgy1',
        echo: false,
      },
      {
        name: '左拱腰2',
        prop: 'zgy2',
        echo: false,
      },
      {
        name: '左拱腰3',
        prop: 'zgy3',
        echo: false,
      },
      {
        name: '右拱腰1',
        prop: 'ygy1',
        echo: false,
      },
      {
        name: '右拱腰2',
        prop: 'ygy2',
        echo: false,
      },
      {
        name: '右拱腰3',
        prop: 'ygy3',
        echo: false,
      },
      {
        name: '拱顶',
        prop: 'gd',
        echo: false,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '隧道大面平整度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许偏差',
        prop: 'yxps',
        echo: true,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值',
        prop: 'scz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '隧道沥青路面压实度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '路面类型',
        prop: 'lmlx',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '路桥隧',
        prop: 'lqs',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '取样位置',
        prop: 'qywz',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '层位',
        prop: 'cw',
        echo: false,
      },
      {
        name: '干燥试件质量',
        prop: 'gzsjzl',
        echo: false,
      },
      {
        name: '试件水中质量',
        prop: 'sjszzl',
        echo: false,
      },
      {
        name: '时间表干质量',
        prop: 'sjbgzl',
        echo: false,
      },
      {
        name: '实验室标准密度',
        prop: 'sysbzmd',
        echo: false,
      },
      {
        name: '最大理论密度',
        prop: 'zdllmd',
        echo: false,
      },
      {
        name: '实验室标准密度规定值',
        prop: 'sysbzmdgdz',
        echo: false,
        numberOnly: true,
      },
      {
        name: '最大理论密度规定值',
        prop: 'zdllmdgdz',
        echo: false,
        numberOnly: true,
      },
    ],
  },
  {
    type: '隧道沥青路面渗水系数',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: false,
      },
      {
        name: '主线、匝道、隧道',
        prop: 'lzdsd',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '初读数',
        prop: 'cds',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '第一分钟读数',
        prop: 'ofzds',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '第二分钟读数',
        prop: 'tfzds',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '水量',
        prop: 'sl',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '时间',
        prop: 'sj',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '渗水系数规定值',
        prop: 'ssxsgdz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '隧道混凝土路面强度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '试样平均直径',
        prop: 'sypjzj',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '试样平均厚度',
        prop: 'sypjhd',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '极限荷载',
        prop: 'jxhz',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '路面强度规定值',
        prop: 'lmqdgdz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '隧道砼路面相邻板高差',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '取样缝位置',
        prop: 'qyfwz',
        echo: false,
      },
      {
        name: '实测值1',
        prop: 'scz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值2',
        prop: 'scz2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '实测值3',
        prop: 'scz3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '隧道路面构造深度手工铺砂法',
    columns: [
      {
        name: '检测日期',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '路面类型',
        prop: 'lmlx',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: 'ABM',
        prop: 'abm',
        echo: false,
      },
      {
        name: 'ZY',
        prop: 'zy',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '车道',
        prop: 'cd',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计最小值',
        prop: 'sjzxz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计最大值',
        prop: 'sjzdz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点1D1',
        prop: 'cd1d1',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点1D2',
        prop: 'cd1d2',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点2D1',
        prop: 'cd2d1',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点2D2',
        prop: 'cd2d2',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点3D1',
        prop: 'cd3d1',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测点3D2',
        prop: 'cd3d2',
        echo: false,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '隧道沥青路面厚度钻芯法',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '路、桥、隧、匝道',
        prop: 'lqszd',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位',
        prop: 'bw',
        echo: false,
      },
      {
        name: '上面层测值1',
        prop: 'smcz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '上面层测值2',
        prop: 'smcz2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '上面层测值3',
        prop: 'smcz3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '上面层测值4',
        prop: 'smcz4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '上面层设计值',
        prop: 'smcsjz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '总厚度测值1',
        prop: 'zhdz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '总厚度测值2',
        prop: 'zhdz2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '总厚度测值3',
        prop: 'zhdz3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '总厚度测值4',
        prop: 'zhdz4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '总厚度设计值',
        prop: 'zhdsjz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '隧道混凝土路面厚度钻芯法',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '路、桥、隧、匝道',
        prop: 'lqszd',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '部位',
        prop: 'bw',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测值1',
        prop: 'cz1',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测值2',
        prop: 'cz2',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测值3',
        prop: 'cz3',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '测值4',
        prop: 'cz4',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
    ],
  },
  {
    type: '隧道横坡',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '路面类型',
        prop: 'lmlx',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '位置',
        prop: 'wz',
        echo: false,
		rules: {
		  notNull: true
		}
      },
      {
        name: '前视读数',
        prop: 'qsds',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '后视读数',
        prop: 'hsds',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '长',
        prop: 'length',
        echo: false,
		numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: false,
        numberOnly: true,
		rules: {
		  notNull: true
		}
      },
      {
        name: '允许偏差',
        prop: 'yxps',
        echo: false,
        numberOnly: true,
        rules: {
          notNull: true
        }
      },
    ],
  },
  {
    type: '隧道总体宽度',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '隧道名称',
        prop: 'sdmc',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: false,
      },
      {
        name: '左边宽',
        prop: 'zbk',
        echo: false,
      },
      {
        name: '右边宽',
        prop: 'ybk',
        echo: false,
      },
      {
        name: '设计值',
        prop: 'sjz',
        echo: false,
        numberOnly: true,
      },
    ],
  },
  {
    type: '净空',
    columns: [
      {
        name: '检测时间',
        prop: 'jcsj',
        echo: false,
      },
      {
        name: '桩号',
        prop: 'zh',
        echo: false,
      },
      {
        name: '点号',
        prop: 'dh',
        echo: false,
      },
      {
        name: 'X',
        prop: 'xz',
        echo: false,
      },
      {
        name: 'Z',
        prop: 'zz',
        echo: false,
      },
      {
        name: '偏差值',
        prop: 'pcz',
        echo: false,
      },
    ],
  },
]

export const getTitlesByType = () => {
  const mainStore = useMainStore()
  const t = mainStore.getCurType()
  return titles.find((item) => item.type === t)?.columns
}
