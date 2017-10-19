# Note if you have blade <= 2.2.0.201707061805
You have to change your **settings.gradle** in Liferay workspace as follows:
```
buildscript {
  dependencies {
    classpath group: "com.liferay", name: "com.liferay.gradle.plugins.workspace", version: "1.7.0"
  }

  repositories {
    maven {
      url "https://cdn.lfrs.sl/repository.liferay.com/nexus/content/groups/public"
    }
  }
}

apply plugin: "com.liferay.workspace"
```
Full discussion in [this thread](https://github.com/liferay/liferay-npm-build-tools/issues/56).
