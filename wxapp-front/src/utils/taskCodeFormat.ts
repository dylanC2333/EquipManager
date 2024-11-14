export const taskCodeSplit = (fullCode: string) => {
	// 使用正则表达式匹配并提取年份和序列号
	const regex = /^RW-(\d{4})-(\d{3})$/;
	const matches = fullCode.match(regex);
	if (matches) {
		return {
		  year: matches[1],  // 提取年份
		  number: matches[2]  // 提取序列号
		};
	} else {
		// throw new Error("格式不正确");
		return {
		  year: '',  // 提取年份
		  number: ''  // 提取序列号
		};
	}
}

export const taskCodeConcat = (parts: {
	year: string,
	number: string
}) =>{
	return "RW-" + parts.year + "-" + parts.number;
}