import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import NodeUtils from '../../../help/utils/NodeUtils';
import { ResourceOperations } from '../../../help/type/IResource';

const MediaUploadImageOperate: ResourceOperations = {
	name: '上传永久素材',
	value: 'media:uploadImage',
	options: [
		{
			displayName: '文件',
			name: 'inputDataFieldName',
			type: 'string',
			placeholder: 'e.g. data',
			default: 'data',
			hint: '包含用于更新文件的二进制文件数据的输入字段的名称',
			description:
				'在左侧输入面板的二进制选项卡中，找到包含二进制数据的输入字段的名称，以更新文件',
			required: true,
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const inputDataFieldName = this.getNodeParameter('inputDataFieldName', index) as string;

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/cgi-bin/media/uploadimg`,
			json: false,
			formData: {
				media: NodeUtils.buildUploadFileData.call(this, inputDataFieldName, index),
			},
		});
	},
};

export default MediaUploadImageOperate;