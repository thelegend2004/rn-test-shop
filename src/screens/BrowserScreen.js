import { useRef, useState } from "react";
import { ThemedView, ThemedText } from "../components/Themed";
import { ActivityIndicator, Button } from "react-native";
import { WebView } from "react-native-webview";

export default function BrowserScreen({ navigation }) {
  const webRef = useRef();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  return (
    <ThemedView style={{ flex: 0.75 }}>
      {error ? (
        <ThemedView>
          <ThemedText>Не удалось загрузить веб-страницу</ThemedText>
          <Button
            title="Повторить"
            onPress={() => {
              setError(false);
              webRef.current.reload();
            }}
          />
        </ThemedView>
      ) : (
        <>
          {progress < 1 && <ActivityIndicator />}
          <WebView
            ref={webRef}
            source={{ uri: "https://www.google.com" }}
            onLoadProgress={({ nativeEvent }) => {
              setProgress(nativeEvent.progress);
            }}
            onError={() => setError(true)}
            style={{ flex: 1 }}
          />
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 8,
            }}
          >
            <Button
              title="Назад"
              onPress={() => webRef.current && webRef.current.goBack()}
            />
            <Button
              title="Вперёд"
              onPress={() => webRef.current && webRef.current.goForward()}
            />
            <Button
              title="Обновить"
              onPress={() => webRef.current && webRef.current.reload()}
            />
            <Button title="Закрыть" onPress={() => navigation.goBack()} />
          </ThemedView>
        </>
      )}
    </ThemedView>
  );
}
