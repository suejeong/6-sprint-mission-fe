// Hook
// 컴포넌트 함수 또는 다른 훅 안에서만 사용 가능
// 함수 최상단에 써야한다 (다른 함수 안에서 불가, 반복문, 조건문에서 불가, 재 렌더링 할 때마다 동일한 순서와 개수로 훅이 실행되어야 한다)

import { useState } from "react";

// 네트워크 대기를 처리하는 훅
export const useAsync = (asyncFunction) => {
	// 인자로 함수를 받음
	const [loading, setLoading] = useState(false); //다른 훅 안에서 훅을 사용하는 상황

	// 인자로 받을 수 있는 것을 설정하지 않음, 모든 인자를 함수에서 받게 끔 설정
	const wrappedFunction = async (...args) => {
		try {
			setLoading(true);
			return asyncFunction(...args); // 함수에 한번 더 껍데기를 씌워 실행
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	return [loading, wrappedFunction];
};
