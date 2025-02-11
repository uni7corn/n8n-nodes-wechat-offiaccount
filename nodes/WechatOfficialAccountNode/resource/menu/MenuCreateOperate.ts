import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const MenuCreateOperate: ResourceOperations = {
	name: '创建',
	value: 'menu:create',
	description: '创建自定义菜单',
	options: [
		{
			displayName: '*菜单格式',
			name: 'data',
			description:
				'参考：https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html',
			required: true,
			type: 'json',
			default: '{}',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const data = this.getNodeParameter('data', index, '') as IDataObject;

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/menu/create`,
			body: data,
		});
	},
};

export default MenuCreateOperate;