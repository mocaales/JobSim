// app/job/Developer/tasks/[taskId].jsx or appropriate path
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '../../../../constants/Colors';
import { developerTasks } from '../../../../data/developerTasks';
import { useUser } from '@clerk/clerk-expo'; 

const htmlTemplate = (code) => `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
      <script>hljs.highlightAll();</script>
      <style>
        body { margin: 0; padding: 12px; background: #282C34; }
        pre { margin: 0; }
      </style>
    </head>
    <body>
      <pre><code class="language-javascript">${code}</code></pre>
    </body>
  </html>
`;

export default function TaskDetail() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const { taskId } = useLocalSearchParams();
  const task = developerTasks.find((t) => t.id === taskId);

  const [startTime] = useState(Date.now());

  const submitDeveloperGameResult = async () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const points = task?.difficulty || 1;
    try {
      await fetch(`${process.env.EXPO_PUBLIC_API_URL}/game/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          game: 'junior_developer',
          time: timeTaken,
          points
        })
      });
    } catch (err) {
      console.error("Failed to submit result", err);
    }
  };


  const handleAnswer = async (index) => {
  const isCorrect = index === task.correctIndex;

  if (isCorrect) {
    await submitDeveloperGameResult();
    Alert.alert('✅ Correct!', 'Well done.');
  } else {
    Alert.alert('❌ Incorrect', 'Try again.');
  }
};



  // Arrange mode
  const [order, setOrder] = useState(task?.shuffled ?? []);
  if (task?.type === 'arrange') {
    const checkOrder = async () => {
    const correct = order.every((line, i) => line === task.lines[i]);
    if (correct) await submitDeveloperGameResult();
    Alert.alert(correct ? '✅ Correct!' : '❌ Incorrect');
  };
    return (
      <View style={styles.arrangeContainer}>
        <Text style={styles.title}>{task.title}</Text>
        <DraggableFlatList
          data={order}
          keyExtractor={(item) => item}
          onDragEnd={({ data }) => setOrder(data)}
          activationDistance={10}
          renderItem={({ item, drag, isActive }) => (
            <TouchableOpacity
              style={[
                styles.arrangeItem,
                isActive && { backgroundColor: '#ddd' }
              ]}
              onLongPress={drag}
            >
              <Text style={styles.arrangeText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.checkButton} onPress={checkOrder}>
          <Text style={styles.checkText}>Preveri vrstni red</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task not found.</Text>
      </View>
    );
  }

  // Default modes: multiple-choice, output, completion
  const { width } = Dimensions.get('window');
  const codeBoxHeight = 200;
  return (
    <View style={styles.defaultContainer}>
      <Text style={styles.title}>{task.title}</Text>
      {task.difficulty != null && (
        <Text style={styles.difficulty}>Difficulty: {task.difficulty}</Text>
      )}
      {task.type === 'output' ? (
        <View style={[styles.codeBox, { width: width - 40, height: codeBoxHeight }]}> 
          <WebView
            originWhitelist={['*']}
            source={{ html: htmlTemplate(task.question) }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
      ) : (
        <View style={[styles.codeBox, { width: width - 40, height: codeBoxHeight }]}> 
          <WebView
            originWhitelist={['*']}
            source={{ html: htmlTemplate(task.question) }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
      )}
      {task.options?.map((opt, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleAnswer(index)}
        >
          <Text style={styles.optionText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  arrangeContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white
  },
  defaultContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black
  },
  difficulty: {
    marginBottom: 10,
    fontSize: 16,
    color: COLORS.gray
  },
  codeBox: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden'
  },
  optionButton: {
    backgroundColor: COLORS.black,
    padding: 12,
    borderRadius: 8,
    marginVertical: 6
  },
  optionText: {
    color: 'white',
    fontSize: 16
  },
  arrangeItem: {
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 6
  },
  arrangeText: {
    fontFamily: 'monospace'
  },
  checkButton: {
    marginTop: 20,
    padding: 14,
    backgroundColor: COLORS.black,
    borderRadius: 8,
    alignItems: 'center'
  },
  checkText: {
    color: 'white',
    fontWeight: '600'
  }
});
