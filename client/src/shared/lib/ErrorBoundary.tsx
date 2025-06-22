
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onCatch?: (error: Error, errorInfo: ErrorInfo) => void; // Добавим возможность обработки ошибок извне
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Обновляем состояние, чтобы следующий рендер показал запасной UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Можно также вывести информацию об ошибке в консоль или отправить в службу сбора ошибок
    console.error("Uncaught error:", error, errorInfo);
    this.setState({errorInfo: errorInfo});

    if (this.props.onCatch) {
        this.props.onCatch(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Можно отобразить любой запасной UI.  Например, компонент для отображения ошибки:
      return (
          <div>
            <h1>Что-то пошло не так.</h1>
            <p>{this.state.error?.message}</p>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.stack}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
            <button onClick={() => this.setState({hasError: false})}>Попробовать снова</button>
          </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
