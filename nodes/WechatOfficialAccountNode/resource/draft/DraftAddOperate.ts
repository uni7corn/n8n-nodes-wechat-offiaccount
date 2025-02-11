import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const DraftAddOperate: ResourceOperations = {
	name: '新建草稿',
	value: 'draft:add',
	description: '新增草稿',
	options: [
		{
			displayName: '草稿文章内容(Articles)',
			name: 'articles',
			type: 'json',
			required: true,
			default: '[]',
			description: '参考文档：https://developers.weixin.qq.com/doc/offiaccount/Draft_Box/Add_draft.html',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const articles = this.getNodeParameter('articles', index) as IDataObject;

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/draft/add`,
			body: {
				articles,
			},
		});
	},
};

export default DraftAddOperate;