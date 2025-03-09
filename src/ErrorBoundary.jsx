import React, { useState, useEffect, Component } from "react"; // React를 명시적으로 import

// ErrorBoundary 클래스형 컴포넌트
class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error) {
		// 오류 발생 시 상태 업데이트
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// 오류 정보 로깅 (디버깅 용도로 사용)
		console.error("Error caught by Error Boundary:", error, errorInfo);
		this.setState({ error, errorInfo });
	}

	render() {
		if (this.state.hasError) {
			// 오류 발생 시 사용자에게 표시할 대체 UI
			return (
				<div>
					<h1>문제가 발생했습니다.</h1>
					<p>{this.state.error?.message}</p>
				</div>
			);
		}

		// 오류가 발생하지 않으면 자식 컴포넌트를 그대로 렌더링
		return this.props.children;
	}
}

export default ErrorBoundary;
